import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { CartButton, CartSheet } from "@/components/Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-mobile-md md:px-tablet-md lg:px-4 h-16 md:h-18 flex items-center justify-between">
        {/* Left side: Burger menu + Logo */}
        <div className="flex items-center space-x-mobile-sm md:space-x-tablet-sm lg:space-x-3">
          {/* Burger Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-foreground hover:text-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet min-w-touch md:min-w-touch-tablet p-mobile-sm md:p-tablet-sm"
              >
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-64 md:w-72 lg:w-56 bg-popover shadow-lg border border-border z-50 max-h-[80vh] overflow-y-auto"
            >
              {/* Main Navigation */}
              <DropdownMenuItem asChild>
                <Link 
                  to="/" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/pricing" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/pricing" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/vr-cameras" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/vr-cameras" ? "bg-muted font-medium" : ""
                  }`}
                >
                  VR Equipment Store
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/capture-services" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/capture-services" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm">
                Support
              </DropdownMenuItem>
              
              {/* Divider */}
              <div className="border-t border-border my-mobile-sm md:my-tablet-sm"></div>
              
              {/* Workspace Items */}
              <div className="px-mobile-md md:px-tablet-md py-mobile-sm md:py-tablet-sm">
                <span className="text-mobile-xs md:text-tablet-xs font-medium text-muted-foreground uppercase tracking-wider">Workspace</span>
              </div>
              <DropdownMenuItem asChild>
                <Link 
                  to="/dashboard" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/dashboard" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/spaces" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/spaces" ? "bg-muted font-medium" : ""
                  }`}
                >
                  All Spaces
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/statistics" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/statistics" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Statistics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/users" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/users" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Users
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/settings" 
                  className={`w-full text-popover-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet py-mobile-sm md:py-tablet-sm px-mobile-md md:px-tablet-md text-mobile-sm md:text-tablet-sm ${
                    location.pathname === "/settings" ? "bg-muted font-medium" : ""
                  }`}
                >
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-mobile-sm md:space-x-tablet-sm touch-manipulation min-h-touch md:min-h-touch-tablet">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-xplor-yellow rounded flex items-center justify-center">
              <span className="text-xplor-black font-bold text-sm md:text-base">X</span>
            </div>
            <span className="font-semibold text-lg md:text-tablet-xl lg:text-xl text-foreground">xplor</span>
          </Link>
        </div>

        {/* Right side: Auth buttons */}
        <div className="flex items-center space-x-mobile-sm md:space-x-tablet-sm lg:space-x-3">
          <CartButton />
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-foreground hover:text-foreground hover:bg-muted min-h-touch md:min-h-touch-tablet px-mobile-sm md:px-tablet-md lg:px-3 hidden sm:inline-flex text-mobile-sm md:text-tablet-sm"
          >
            Sign In
          </Button>
          <Button 
            size="sm" 
            className="bg-foreground hover:bg-foreground/90 text-background min-h-touch md:min-h-touch-tablet px-mobile-md md:px-tablet-lg lg:px-4 text-mobile-sm md:text-tablet-sm"
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Join</span>
          </Button>
        </div>
      </div>
      <CartSheet />
    </header>
  );
};

export default Header;