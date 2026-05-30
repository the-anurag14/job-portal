import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { jobService } from "@/services/jobService";
import type { Application, Job } from "@/types";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  applied: "secondary",
  shortlisted: "default",
  rejected: "destructive",
};

const CandidateDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    jobService
      .getMyApplications()
      .then((res) => setApplications(res.data.applications))
      .catch(() => setError("Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  const getJob = (app: Application): Job | null =>
    typeof app.job === "object" ? (app.job as Job) : null;

  return (
    <DashboardLayout>
      <PageHeader
        badge="Candidate"
        title="My Applications"
        description="Track every role you've applied to and your current status."
      />

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && error && <ErrorState message={error} onRetry={() => window.location.reload()} />}

      {!loading && !error && applications.length === 0 && (
        <EmptyState
          icon={FileText}
          title="No applications yet"
          description="Browse open roles and apply to start tracking your pipeline."
          actionLabel="Browse Jobs"
          onAction={() => (window.location.href = "/jobs")}
        />
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="space-y-4">
          {applications.map((app) => {
            const job = getJob(app);
            return (
              <div
                key={app._id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-foreground">
                    {job?.title || "Job"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {job?.company} · {job?.location}
                  </p>
                  {job?._id && (
                    <Link
                      to={`/jobs/${job._id}`}
                      className="mt-2 inline-block text-sm text-secondary hover:underline"
                    >
                      View job
                    </Link>
                  )}
                </div>
                <Badge variant={statusVariant[app.status] || "outline"} className="w-fit capitalize">
                  {app.status}
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CandidateDashboard;
