import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="VenueConnect" 
            className="h-10 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden text-2xl font-display font-bold">
            <span className="text-primary">Venue</span>
            <span className="text-foreground">Connect</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/venues" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Venues
          </Link>
          <Link to="/cities" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Cities
          </Link>
          <Link to="/blog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/5" asChild>
            <Link to="/list-venue">List Your Venue</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white p-4 space-y-3">
          <Link to="/" className="block text-sm font-medium py-2" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/venues" className="block text-sm font-medium py-2" onClick={() => setOpen(false)}>Venues</Link>
          <Link to="/cities" className="block text-sm font-medium py-2" onClick={() => setOpen(false)}>Cities</Link>
          <Link to="/list-venue" className="block text-sm font-medium py-2" onClick={() => setOpen(false)}>List Your Venue</Link>
          <Button size="sm" className="w-full bg-primary" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
