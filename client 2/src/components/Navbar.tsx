import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">JobPortal</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Jobs</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#companies" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Companies</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 amber-glow">Get Started</Button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          <a href="#jobs" className="block text-sm font-medium text-muted-foreground py-2">Find Jobs</a>
          <a href="#how-it-works" className="block text-sm font-medium text-muted-foreground py-2">How It Works</a>
          <a href="#companies" className="block text-sm font-medium text-muted-foreground py-2">Companies</a>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
            <Button size="sm" className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
