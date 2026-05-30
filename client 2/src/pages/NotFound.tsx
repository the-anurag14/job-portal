import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AppNavbar from "@/components/layout/AppNavbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-16 text-center">
        <p className="text-8xl font-bold text-muted-foreground/30">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button className="mt-8" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
