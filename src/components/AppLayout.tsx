import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartButton, CartSheet } from "@/components/Cart";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 sm:h-16 border-b border-border bg-background flex items-center justify-between px-mobile-md sm:px-4">
            <div className="flex items-center gap-mobile-sm sm:gap-2">
              <SidebarTrigger className="p-mobile-sm sm:p-2 hover:bg-muted rounded-md min-h-touch min-w-touch">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
              <h1 className="text-mobile-sm sm:text-sm font-medium text-foreground hidden sm:block">xplor Workspace</h1>
              <h1 className="text-mobile-sm font-medium text-foreground sm:hidden">Workspace</h1>
            </div>
            
            <div className="flex items-center gap-mobile-sm sm:gap-2">
              <CartButton />
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex min-h-touch">
                    <Link to="/accounts">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="sm:hidden min-h-touch min-w-touch p-mobile-sm">
                    <Link to="/accounts">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={async () => {
                      console.log('AppLayout: Sign out button clicked');
                      try {
                        // Add timeout to prevent hanging
                        const signOutPromise = signOut();
                        const timeoutPromise = new Promise((_, reject) => 
                          setTimeout(() => reject(new Error('Sign out timeout')), 5000)
                        );
                        
                        await Promise.race([signOutPromise, timeoutPromise]);
                        console.log('AppLayout: Sign out completed, navigating to home');
                        navigate("/");
                      } catch (error) {
                        console.error('AppLayout: Sign out error:', error);
                        // Force navigation even if sign out fails
                        navigate("/");
                      }
                    }}
                    className="min-h-touch"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </>
              ) : (
                <Button variant="ghost" size="sm" asChild className="min-h-touch">
                  <Link to="/auth">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                </Button>
              )}
               <Button size="sm" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black min-h-touch px-mobile-md sm:px-4 text-mobile-sm sm:text-sm font-medium">
                 <span className="hidden sm:inline">Upgrade</span>
                 <span className="sm:hidden">Pro</span>
               </Button>
            </div>
          </header>

          <CartSheet />

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}