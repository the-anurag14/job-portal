import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import AppNavbar from "./AppNavbar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isRecruiter = user?.role === "recruiter";

  const links = isRecruiter
    ? [
        { to: "/dashboard/recruiter", label: "Overview", icon: LayoutDashboard },
        { to: "/jobs", label: "Browse Jobs", icon: Briefcase },
        { to: "/profile", label: "Profile", icon: User },
      ]
    : [
        { to: "/dashboard/candidate", label: "Applications", icon: FileText },
        { to: "/jobs", label: "Find Jobs", icon: Briefcase },
        { to: "/match", label: "Resume Match", icon: Sparkles },
        { to: "/profile", label: "Profile", icon: User },
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />
      <AppNavbar />
      <div className="container relative mx-auto flex gap-8 px-4 pb-12 pt-24">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card/60 p-3 backdrop-blur-xl">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {isRecruiter ? "Recruiter" : "Candidate"}
            </p>
            <nav className="space-y-1">
              {links.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === to
                      ? "bg-secondary/15 text-secondary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              {isRecruiter && (
                <div className="mt-4 flex items-center gap-2 px-3 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  Manage applicants per job
                </div>
              )}
            </nav>
          </div>
        </aside>
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0 flex-1"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
