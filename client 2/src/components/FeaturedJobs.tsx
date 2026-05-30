import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import { jobService } from "@/services/jobService";
import type { Job } from "@/types";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService
      .getJobs()
      .then((res) => setJobs(res.data.jobs.slice(0, 6)))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="jobs" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              Featured Jobs
            </h2>
            <p className="text-lg text-muted-foreground">
              Live openings from companies hiring now
            </p>
          </motion.div>
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link to="/jobs">View All Jobs</Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No jobs posted yet. Recruiters can add listings from their dashboard.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, i) => (
              <JobCard key={job._id} job={job} index={i} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
