import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users } from "lucide-react";

const CTASection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hero-gradient relative overflow-hidden rounded-3xl p-10"
        >
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10" />
          <Users className="mb-6 h-10 w-10 text-secondary" />
          <h3 className="mb-3 text-2xl font-bold text-primary-foreground">For Job Seekers</h3>
          <p className="mb-8 leading-relaxed text-primary-foreground/70">
            Apply to roles, track applications, and use AI resume matching to find your best fit.
          </p>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 amber-glow" asChild>
            <Link to="/register">
              Start Your Search <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-10 card-shadow backdrop-blur-sm"
        >
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-muted" />
          <Building2 className="mb-6 h-10 w-10 text-secondary" />
          <h3 className="mb-3 text-2xl font-bold text-foreground">For Recruiters</h3>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Post jobs, review applicants, and hire faster with a modern recruiting workspace.
          </p>
          <Button variant="outline" className="border-foreground/20" asChild>
            <Link to="/register">
              Post a Job <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CTASection;
