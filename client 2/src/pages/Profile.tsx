import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, Shield, User } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <PageHeader title="Profile" description="Your account details and session." />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl card-shadow"
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="capitalize text-sm text-muted-foreground">{user.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{user.role}</span>
          </div>
        </div>

        <Button
          variant="destructive"
          className="mt-8 w-full gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
