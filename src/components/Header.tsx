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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side: Burger menu + Logo */}
        <div className="flex items-center space-x-3">
          {/* Burger Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-black hover:text-black hover:bg-black/10">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-56 bg-white shadow-lg border border-gray-200 z-50"
            >
              <DropdownMenuItem asChild>
                <Link 
                  to="/" 
                  className={`w-full text-black hover:bg-gray-100 ${
                    location.pathname === "/" ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/pricing" 
                  className={`w-full text-black hover:bg-gray-100 ${
                    location.pathname === "/pricing" ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/vr-cameras" 
                  className={`w-full text-black hover:bg-gray-100 ${
                    location.pathname === "/vr-cameras" ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  VR Equipment Store
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/capture-services" 
                  className={`w-full text-black hover:bg-gray-100 ${
                    location.pathname === "/capture-services" ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:bg-gray-100">
                Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-xplor-yellow rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">X</span>
            </div>
            <span className="font-semibold text-xl text-black">Xplor</span>
          </Link>
        </div>

        {/* Right side: Auth buttons */}
        <div className="flex items-center space-x-3">
          <CartButton />
          <Button variant="ghost" size="sm" className="text-black hover:text-black hover:bg-black/10">
            Sign In
          </Button>
          <Button size="sm" className="bg-black hover:bg-black/90 text-white">
            Get Started
          </Button>
        </div>
      </div>
      <CartSheet />
    </header>
  );
};

export default Header;