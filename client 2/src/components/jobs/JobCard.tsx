import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, IndianRupee, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types";

const tagColors = [
  "bg-secondary/10 text-secondary",
  "bg-primary/10 text-primary",
  "bg-muted text-muted-foreground",
];

interface JobCardProps {
  job: Job;
  index?: number;
  showApply?: boolean;
  onApply?: (jobId: string) => void;
  applying?: boolean;
}

const JobCard = ({ job, index = 0, showApply, onApply, applying }: JobCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Link
      to={`/jobs/${job._id}`}
      className="group block rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-hover-shadow"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          {job.company?.slice(0, 2).toUpperCase()}
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-secondary">
        {job.title}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">{job.company}</p>

      {job.skills?.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((tag, j) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${tagColors[j % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          Full Time
        </span>
        {job.salary != null && (
          <span className="ml-auto flex items-center gap-1 font-semibold text-foreground">
            <IndianRupee className="h-3.5 w-3.5" />
            {job.salary.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      {showApply && onApply && (
        <Button
          className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          disabled={applying}
          onClick={(e) => {
            e.preventDefault();
            onApply(job._id);
          }}
        >
          {applying ? "Applying..." : "Apply Now"}
        </Button>
      )}
    </Link>
  </motion.div>
);

export default JobCard;
