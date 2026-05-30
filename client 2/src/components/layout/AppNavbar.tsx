import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Menu, X, Moon, Sun, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const dashboardPath =
    user?.role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/candidate";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { href: "/jobs", label: "Jobs" },
    { href: "/match", label: "Resume Match", auth: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <Briefcase className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">TalentFlow</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks
            .filter((l) => !l.auth || isAuthenticated)
            .map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to={dashboardPath}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 amber-glow" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="space-y-3 border-b border-border bg-card px-4 pb-4 md:hidden">
          {navLinks
            .filter((l) => !l.auth || isAuthenticated)
            .map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-sm font-medium text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          {isAuthenticated ? (
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" asChild>
                <Link to={dashboardPath} onClick={() => setMobileOpen(false)}>Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" className="flex-1" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="flex-1 bg-secondary text-secondary-foreground" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
