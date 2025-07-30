import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthDebugInfo {
  sessionValid: boolean;
  userExists: boolean;
  adminRoleExists: boolean;
  lastCheck: Date | null;
  errors: string[];
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  debugInfo: AuthDebugInfo;
  refreshAuth: () => Promise<void>;
  forceAdminCheck: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTHORIZED_ADMIN_EMAILS = ['johnnydrumm@gmail.com', 'info@xplor.io'];

console.log('AuthContext: AUTHORIZED_ADMIN_EMAILS loaded:', AUTHORIZED_ADMIN_EMAILS);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<AuthDebugInfo>({
    sessionValid: false,
    userExists: false,
    adminRoleExists: false,
    lastCheck: null,
    errors: []
  });

  const updateDebugInfo = (updates: Partial<AuthDebugInfo>) => {
    setDebugInfo(prev => ({
      ...prev,
      ...updates,
      lastCheck: new Date()
    }));
  };

  const checkAdminStatus = async (currentUser: User | null): Promise<boolean> => {
    if (!currentUser) {
      updateDebugInfo({
        sessionValid: false,
        userExists: false,
        adminRoleExists: false,
        errors: ['No user session found']
      });
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

      if (roleError) {
        errors.push(`Role check error: ${roleError.message}`);
      } else if (roleData) {
        adminStatus = true;
      }

      // Method 2: Fallback - Check if email is in authorized list (immediate grant)
      console.log('Checking authorized emails:', {
        currentUserEmail: currentUser.email,
        authorizedEmails: AUTHORIZED_ADMIN_EMAILS,
        isIncluded: AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')
      });
      
      if (!adminStatus && AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        console.log('Email is in authorized list, granting admin access immediately');
        adminStatus = true;
      }

      // Method 3: Use is_admin() function as final check
      if (!adminStatus) {
        const { data: functionResult, error: functionError } = await supabase
          .rpc('is_admin');

        if (functionError) {
          errors.push(`Function check error: ${functionError.message}`);
        } else if (functionResult) {
          adminStatus = true;
        }
      }

      updateDebugInfo({
        sessionValid: true,
        userExists: true,
        adminRoleExists: adminStatus,
        errors
      });

      return adminStatus;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Unexpected error: ${errorMessage}`);
      
      updateDebugInfo({
        sessionValid: true,
        userExists: true,
        adminRoleExists: false,
        errors
      });

      // Final fallback for authorized emails
      if (AUTHORIZED_ADMIN_EMAILS.includes(currentUser.email || '')) {
        toast.warning('Using fallback admin access');
        return true;
      }

      return false;
    }
  };

  const refreshAuth = async () => {
    console.log('refreshAuth called, setting loading to true');
    setIsLoading(true);
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      console.log('Got session:', currentSession?.user?.email, 'Error:', error);
      
      if (error) {
        updateDebugInfo({ errors: [`Session refresh error: ${error.message}`] });
        throw error;
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      const adminStatus = await checkAdminStatus(currentSession?.user ?? null);
      setIsAdmin(adminStatus);
      console.log('Admin status:', adminStatus);
    } catch (error) {
      console.error('Auth refresh failed:', error);
      toast.error('Failed to refresh authentication');
    } finally {
      console.log('refreshAuth finished, setting loading to false');
      setIsLoading(false);
    }
  };

  const forceAdminCheck = async (): Promise<boolean> => {
    const adminStatus = await checkAdminStatus(user);
    setIsAdmin(adminStatus);
    return adminStatus;
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          const adminStatus = await checkAdminStatus(currentSession.user);
          setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
          updateDebugInfo({
            sessionValid: false,
            userExists: false,
            adminRoleExists: false,
            errors: ['User logged out']
          });
        }
        
        // Always set loading to false after processing auth state
        setIsLoading(false);
      }
    );

    // Initial session check - but don't call refreshAuth if we already have auth state
    console.log('Initial auth setup');
    if (!session && !user) {
      refreshAuth();
    } else {
      console.log('Already have auth state, skipping initial refresh');
      setIsLoading(false);
    }

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    isAdmin,
    isLoading,
    debugInfo,
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