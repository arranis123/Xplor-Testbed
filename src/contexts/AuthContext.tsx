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
  const [isLoading, setIsLoading] = useState(false); // Start with false to prevent infinite loading
  const [isSigningOut, setIsSigningOut] = useState(false);

  const checkAdminStatus = async (currentUser: User | null): Promise<boolean> => {
    if (!currentUser) {
      return false;
    }

    try {
      // Method 1: Immediate check for authorized emails
      if (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        return true;
      }

      // Method 2: Check user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleError && roleData) {
        return true;
      }

      return false;

    } catch (error) {
      console.error('AuthContext: Error checking admin status:', error);
      
      // Final fallback for authorized emails
      if (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
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
    console.log('AuthContext: signOut called, isSigningOut:', isSigningOut);
    
    // Reset signing out state if it's been stuck for too long
    if (isSigningOut) {
      console.log('AuthContext: Resetting stuck signing out state');
      setIsSigningOut(false);
    }
    
    setIsSigningOut(true);
    
    try {
      console.log('AuthContext: Clearing local state immediately');
      
      // Force clear local state first
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setIsLoading(false);
      
      console.log('AuthContext: Calling supabase.auth.signOut()');
      
      // Try to sign out from Supabase with timeout
      const signOutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((resolve) => 
        setTimeout(() => resolve({ error: null }), 2000)
      );
      
      await Promise.race([signOutPromise, timeoutPromise]);
      
      console.log('AuthContext: Sign out completed');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('AuthContext: Error signing out:', error);
      toast.error('Signed out locally');
    } finally {
      setIsSigningOut(false);
      console.log('AuthContext: Reset isSigningOut to false');
    }
  };

  useEffect(() => {
    console.log('AuthContext: Starting initialization');
    let mounted = true;
    
    // Force loading to false after 3 seconds if it hasn't resolved
    const loadingTimeout = setTimeout(() => {
      if (mounted) {
        console.log('AuthContext: Forcing loading to false due to timeout');
        setIsLoading(false);
      }
    }, 3000);
    
    const initializeAuth = async () => {
      try {
        // Get initial session first
        console.log('AuthContext: Getting initial session');
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthContext: Error getting initial session:', error);
          if (mounted) {
            clearTimeout(loadingTimeout);
            setIsLoading(false);
          }
          return;
        }
        
        console.log('AuthContext: Initial session result:', currentSession?.user?.email || 'null');
        
        if (mounted) {
          clearTimeout(loadingTimeout);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            const adminStatus = await checkAdminStatus(currentSession.user);
            if (mounted) {
              setIsAdmin(adminStatus);
            }
          } else {
            setIsAdmin(false);
          }
          
          setIsLoading(false);
          console.log('AuthContext: Initialization complete, isLoading set to false');
        }
      } catch (error) {
        console.error('AuthContext: Initialization error:', error);
        if (mounted) {
          clearTimeout(loadingTimeout);
          setIsLoading(false);
        }
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('AuthContext: Auth state change event:', event, 'User:', currentSession?.user?.email || 'null');
        if (!mounted) return;
        
        clearTimeout(loadingTimeout);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          const adminStatus = await checkAdminStatus(currentSession.user);
          if (mounted) {
            setIsAdmin(adminStatus);
          }
        } else {
          if (mounted) {
            setIsAdmin(false);
          }
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
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