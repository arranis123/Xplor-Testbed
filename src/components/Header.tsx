import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-xplor-yellow rounded flex items-center justify-center">
            <span className="text-xplor-black font-bold text-sm">X</span>
          </div>
          <span className="font-semibold text-xl text-foreground">Xplor</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/pricing" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link 
            to="/vr-cameras" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/vr-cameras" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            VR Equipment Store
          </Link>
          <Link 
            to="/capture-services" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/capture-services" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Services
          </Link>
          <span className="text-sm font-medium text-muted-foreground">Support</span>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;