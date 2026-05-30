import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Professionals collaborating" className="h-full w-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
            <span className="text-sm font-medium text-primary-foreground/90">AI-Powered Job Matching</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.08] text-primary-foreground md:text-7xl">
            Find Your <span className="text-gradient">Dream Job</span> Today
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            Connect with employers, match your resume with AI, and manage applications in one place.
          </p>

          <div className="flex max-w-2xl flex-col gap-2 rounded-2xl bg-card/90 p-2 card-shadow backdrop-blur-xl md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="City or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-12 rounded-xl bg-secondary px-8 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 amber-glow"
            >
              Search Jobs
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
