import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { toast } from "sonner";
import AppNavbar from "@/components/layout/AppNavbar";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import JobFilters from "@/components/jobs/JobFilters";
import { jobService } from "@/services/jobService";
import { useAuth } from "@/context/AuthContext";
import type { Job } from "@/types";

const Jobs = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [skill, setSkill] = useState("");
  const [applyingId, setApplyingId] = useState<string | null>(null);

  const fetchJobs = useCallback(async (search = false) => {
    setLoading(true);
    setError(null);
    try {
      const hasFilters = keyword || location || skill;
      const res =
        search && hasFilters
          ? await jobService.searchJobs({
              keyword: keyword || undefined,
              location: location || undefined,
              skill: skill || undefined,
            })
          : await jobService.getJobs();
      setJobs(res.data.jobs);
    } catch {
      setError("Failed to load jobs. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [keyword, location, skill]);

  useEffect(() => {
    const hasUrlFilters = searchParams.get("keyword") || searchParams.get("location");
    fetchJobs(!!hasUrlFilters);
  }, [fetchJobs, searchParams]);

  const handleApply = async (jobId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to apply");
      return;
    }
    setApplyingId(jobId);
    try {
      await jobService.apply(jobId);
      toast.success("Application submitted successfully");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to apply";
      toast.error(msg);
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <AppNavbar />
      <div className="container relative mx-auto px-4 pb-16 pt-24">
        <PageHeader
          title="Find your next role"
          description="Browse openings from companies hiring now. Search by title, location, or skill."
          badge="Jobs"
        />

        <div className="mb-8">
          <JobFilters
            keyword={keyword}
            location={location}
            skill={skill}
            onKeywordChange={setKeyword}
            onLocationChange={setLocation}
            onSkillChange={setSkill}
            onSearch={() => fetchJobs(true)}
            onClear={() => {
              setKeyword("");
              setLocation("");
              setSkill("");
              fetchJobs();
            }}
            loading={loading}
          />
        </div>

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={() => fetchJobs()} />}

        {!loading && !error && jobs.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No jobs found"
            description="Try adjusting your filters or check back later for new openings."
          />
        )}

        {!loading && !error && jobs.length > 0 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">{jobs.length} positions</p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, i) => (
                <JobCard
                  key={job._id}
                  job={job}
                  index={i}
                  showApply={isAuthenticated}
                  onApply={handleApply}
                  applying={applyingId === job._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
