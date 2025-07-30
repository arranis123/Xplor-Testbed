import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartButton, CartSheet } from "@/components/Cart";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, signOut } = useAuth();

  // Check if admin console should be shown (simplified)
  const isDevelopment = import.meta.env.DEV;
  const shouldShowAdmin = user?.email === 'info@xplor.io' || isDevelopment;

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-mobile-md sm:px-4 h-16 sm:h-16 flex items-center justify-between">
        {/* Left side: Burger menu + Logo */}
        <div className="flex items-center space-x-mobile-sm sm:space-x-3">
          {/* Burger Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-foreground hover:bg-muted min-h-touch min-w-touch p-mobile-sm"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-64 sm:w-56 bg-popover shadow-lg border border-border z-50 max-h-[80vh] overflow-y-auto"
            >
              {/* Main Navigation */}
              <DropdownMenuItem asChild>
                <Link 
                  to="/" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/pricing" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/pricing" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/vr-cameras" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/vr-cameras" ? "bg-muted font-medium" : ""
                  }`}
                >
                  VR Equipment Store
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/capture-services" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/capture-services" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md">
                Support
              </DropdownMenuItem>
              
              {/* Divider */}
              <div className="border-t border-border my-mobile-sm"></div>
              
              {/* Workspace Items */}
              <div className="px-mobile-md py-mobile-sm">
                <span className="text-mobile-xs font-medium text-muted-foreground uppercase tracking-wider">Workspace</span>
              </div>
              <DropdownMenuItem asChild>
                <Link 
                  to="/dashboard" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/dashboard" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/spaces" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/spaces" ? "bg-muted font-medium" : ""
                  }`}
                >
                  All Spaces
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/statistics" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/statistics" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Statistics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/users" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/users" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Users
                </Link>
              </DropdownMenuItem>
              {shouldShowAdmin && (
                <DropdownMenuItem asChild>
                  <Link 
                    to="/admin" 
                    className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                      location.pathname === "/admin" ? "bg-muted font-medium" : ""
                    }`}
                  >
                    Admin Console
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link 
                  to="/settings" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch py-mobile-sm px-mobile-md ${
                    location.pathname === "/settings" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-mobile-sm touch-manipulation min-h-touch">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">X</span>
            </div>
            <span className="font-semibold text-lg sm:text-xl text-foreground">xplor</span>
          </Link>
        </div>

        {/* Right side: Cart button only */}
        <div className="flex items-center space-x-mobile-sm sm:space-x-3">
          <CartButton />
        </div>
      </div>
      <CartSheet />
    </header>
  );
};

export default Header;