import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, Users } from "lucide-react";
import { jobService } from "@/services/jobService";

const StatsSection = () => {
  const [jobCount, setJobCount] = useState<number | null>(null);

  useEffect(() => {
    jobService
      .getJobs()
      .then((res) => setJobCount(res.data.total))
      .catch(() => setJobCount(null));
  }, []);

  const stats = [
    {
      icon: Briefcase,
      value: jobCount != null ? `${jobCount}+` : "—",
      label: "Open Positions",
    },
    {
      icon: Building2,
      value: jobCount != null && jobCount > 0 ? `${Math.max(1, Math.ceil(jobCount / 2))}+` : "—",
      label: "Hiring Companies",
    },
    {
      icon: Users,
      value: "AI",
      label: "Resume Matching",
    },
  ];

  return (
    <section className="border-y border-border bg-card/40 py-16 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15">
                <stat.icon className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
