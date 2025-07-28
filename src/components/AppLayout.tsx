import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { CartButton, CartSheet } from "@/components/Cart";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="p-2 hover:bg-muted rounded-md">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
              <h1 className="text-sm font-medium text-foreground">Xplor Workspace</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <CartButton />
              <Button variant="ghost" size="sm" asChild>
                <Link to="/accounts">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Link>
              </Button>
              <Button size="sm" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                Upgrade
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