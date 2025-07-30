import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
  forceAdminCheck: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTHORIZED_ADMIN_EMAILS = ['johnnydrumm@gmail.com', 'info@xplor.io'];



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminStatus = async (currentUser: User | null): Promise<boolean> => {
    if (!currentUser) {
      return false;
    }

    const errors: string[] = [];
    let adminStatus = false;

    try {
      // Method 1: Check user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleError && roleData) {
        adminStatus = true;
      }

      // Method 2: Fallback - Check if email is in authorized list (immediate grant)
      if (!adminStatus && AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        adminStatus = true;
      }

      // Method 3: Use is_admin() function as final check
      if (!adminStatus) {
        const { data: functionResult, error: functionError } = await supabase
          .rpc('is_admin');

        if (!functionError && functionResult) {
          adminStatus = true;
        }
      }

      return adminStatus;

    } catch (error) {
      // Final fallback for authorized emails
      if (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        toast.warning('Using fallback admin access');
        return true;
      }

      return false;
    }
  };

  const refreshAuth = async () => {
    setIsLoading(true);
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      const adminStatus = await checkAdminStatus(currentSession?.user ?? null);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Auth refresh failed:', error);
      toast.error('Failed to refresh authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const forceAdminCheck = async (): Promise<boolean> => {
    const adminStatus = await checkAdminStatus(user);
    setIsAdmin(adminStatus);
    return adminStatus;
  };

  useEffect(() => {
    console.log('AuthContext: Starting initialization');
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('AuthContext: Auth state change event:', event, 'User:', currentSession?.user?.email);
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          console.log('AuthContext: Checking admin status for user');
          const adminStatus = await checkAdminStatus(currentSession.user);
          if (mounted) {
            setIsAdmin(adminStatus);
            console.log('AuthContext: Admin status set to:', adminStatus);
          }
        } else {
          console.log('AuthContext: No user session, setting admin to false');
          if (mounted) {
            setIsAdmin(false);
          }
        }
        
        if (mounted) {
          console.log('AuthContext: Setting isLoading to false from auth state change');
          setIsLoading(false);
        }
      }
    );

    // Get initial session
    console.log('AuthContext: Getting initial session');
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('AuthContext: Initial session result:', currentSession?.user?.email);
      if (!mounted) return;
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        console.log('AuthContext: Initial session has user, checking admin status');
        checkAdminStatus(currentSession.user).then(adminStatus => {
          if (mounted) {
            setIsAdmin(adminStatus);
            console.log('AuthContext: Initial admin status set to:', adminStatus);
            console.log('AuthContext: Setting isLoading to false from initial session check');
            setIsLoading(false);
          }
        });
      } else {
        console.log('AuthContext: No initial session, setting loading to false');
        if (mounted) {
          setIsLoading(false);
        }
      }
    }).catch(error => {
      console.error('AuthContext: Error getting initial session:', error);
      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isAdmin,
    isLoading,
    refreshAuth,
    forceAdminCheck
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}