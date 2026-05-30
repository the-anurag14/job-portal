import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { jobService } from "@/services/jobService";
import type { Application, Job } from "@/types";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Record<string, Application[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postOpen, setPostOpen] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    skills: "",
  });

  const loadJobs = () => {
    setLoading(true);
    jobService
      .getMyJobs()
      .then((res) => setJobs(res.data.jobs))
      .catch(() => setError("Failed to load your jobs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const loadApplicants = async (jobId: string) => {
    if (applicants[jobId]) {
      setExpandedJob(expandedJob === jobId ? null : jobId);
      return;
    }
    try {
      const res = await jobService.getApplicants(jobId);
      setApplicants((prev) => ({ ...prev, [jobId]: res.data.applications }));
      setExpandedJob(jobId);
    } catch {
      toast.error("Failed to load applicants");
    }
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jobService.postJob({
        title: form.title,
        company: form.company,
        location: form.location,
        description: form.description,
        salary: form.salary ? Number(form.salary) : undefined,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      toast.success("Job posted");
      setPostOpen(false);
      setForm({ title: "", company: "", location: "", description: "", salary: "", skills: "" });
      loadJobs();
    } catch {
      toast.error("Failed to post job");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          badge="Recruiter"
          title="Your postings"
          description="Manage jobs and review applicants in one place."
        />
        <Dialog open={postOpen} onOpenChange={setPostOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Post Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Post a new job</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>Company</Label>
                <Input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <Label>Location</Label>
                <Input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <Label>Salary (annual)</Label>
                <Input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
              </div>
              <div>
                <Label>Skills (comma-separated)</Label>
                <Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, MongoDB" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">Publish</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && error && <ErrorState message={error} onRetry={loadJobs} />}

      {!loading && !error && jobs.length === 0 && (
        <EmptyState
          icon={Briefcase}
          title="No jobs posted"
          description="Create your first listing to start receiving applications."
          actionLabel="Post Job"
          onAction={() => setPostOpen(true)}
        />
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company} · {job.location}
                  </p>
                  <Link to={`/jobs/${job._id}`} className="mt-1 inline-block text-sm text-secondary hover:underline">
                    View public listing
                  </Link>
                </div>
                <Button variant="outline" onClick={() => loadApplicants(job._id)} className="gap-2">
                  <Users className="h-4 w-4" />
                  {expandedJob === job._id ? "Hide" : "View"} Applicants
                </Button>
              </div>

              {expandedJob === job._id && (
                <div className="mt-4 border-t border-border pt-4">
                  {!applicants[job._id]?.length ? (
                    <p className="text-sm text-muted-foreground">No applicants yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {applicants[job._id].map((app) => {
                        const applicant =
                          typeof app.applicant === "object" ? app.applicant : null;
                        return (
                          <li
                            key={app._id}
                            className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                          >
                            <div>
                              <p className="font-medium">{applicant?.name || "Applicant"}</p>
                              <p className="text-sm text-muted-foreground">{applicant?.email}</p>
                            </div>
                            <span className="text-xs capitalize text-muted-foreground">{app.status}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
