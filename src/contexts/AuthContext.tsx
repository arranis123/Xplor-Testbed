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
  signOut: () => Promise<void>;
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

    try {
      console.log('AuthContext: Checking admin status for email:', currentUser.email);
      
      // Method 1: Immediate check for authorized emails
      if (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        console.log('AuthContext: Email is in authorized list, granting admin access');
        return true;
      }

      // Method 2: Check user_roles table with timeout
      console.log('AuthContext: Checking user_roles table');
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleError && roleData) {
        console.log('AuthContext: Found admin role in database');
        return true;
      }

      console.log('AuthContext: No admin role found, returning false');
      return false;

    } catch (error) {
      console.error('AuthContext: Error checking admin status:', error);
      
      // Final fallback for authorized emails
      if (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        console.log('AuthContext: Using fallback admin access for authorized email');
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

  const signOut = async () => {
    console.log('AuthContext - signOut function called');
    try {
      console.log('AuthContext - Calling supabase.auth.signOut()');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthContext - Supabase signOut error:', error);
        throw error;
      }
      
      console.log('AuthContext - Supabase signOut successful, resetting state');
      // Reset state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setIsLoading(false);
      
      console.log('AuthContext - State reset complete');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('AuthContext - Error signing out:', error);
      toast.error('Error signing out');
    }
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
    forceAdminCheck,
    signOut
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