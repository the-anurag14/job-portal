import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, IndianRupee, MapPin, Sparkles } from "lucide-react";
import { toast } from "sonner";
import AppNavbar from "@/components/layout/AppNavbar";
import ErrorState from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { jobService } from "@/services/jobService";
import { useAuth } from "@/context/AuthContext";
import type { Job } from "@/types";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    setLoading(true);
    jobService
      .getJob(jobId)
      .then((res) => setJob(res.data.job))
      .catch(() => setError("Job not found or server unavailable"))
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleApply = async () => {
    if (!jobId) return;
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/jobs/${jobId}` } });
      return;
    }
    setApplying(true);
    try {
      await jobService.apply(jobId);
      toast.success("Application submitted");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to apply";
      toast.error(msg);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <div className="container mx-auto max-w-4xl px-4 pb-16 pt-24">
        <Button variant="ghost" className="mb-6 gap-2" asChild>
          <Link to="/jobs">
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>
        </Button>

        {loading && (
          <div className="space-y-4 rounded-2xl border border-border bg-card p-8">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

        {!loading && job && (
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl card-shadow"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                <p className="mt-2 flex items-center gap-2 text-lg text-muted-foreground">
                  <Building2 className="h-5 w-5" />
                  {job.company}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  {job.salary != null && (
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <IndianRupee className="h-4 w-4" />
                      {job.salary.toLocaleString("en-IN")} / year
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <Button
                  onClick={handleApply}
                  disabled={applying}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {applying ? "Applying..." : "Apply Now"}
                </Button>
                {isAuthenticated && (
                  <Button variant="outline" asChild>
                    <Link to={`/match?jobId=${job._id}`}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Match Resume
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {job.skills?.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </h2>
              <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                {job.description}
              </p>
            </div>
          </motion.article>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
