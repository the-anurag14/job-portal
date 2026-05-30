import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Upload, XCircle } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import MatchScoreChart from "@/components/match/MatchScoreChart";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobService } from "@/services/jobService";
import type { Job, MatchResult } from "@/types";

const ResumeMatch = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobId, setJobId] = useState(searchParams.get("jobId") || "");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    jobService.getJobs().then((res) => setJobs(res.data.jobs)).catch(() => toast.error("Failed to load jobs"));
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setResumeText(reader.result);
        toast.success("Resume loaded from file");
      }
    };
    reader.readAsText(file);
  };

  const handleMatch = async () => {
    if (!jobId || !resumeText.trim()) {
      toast.error("Select a job and provide resume text");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data } = await jobService.matchResume(resumeText, jobId);
      setResult(data);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Match failed. Ensure AI service is running on port 8001.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        badge="AI"
        title="Resume Match"
        description="Compare your resume against a job description and get a match score with skill insights."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-xl"
        >
          <div>
            <Label>Select job</Label>
            <Select value={jobId} onValueChange={setJobId}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a position" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job._id} value={job._id}>
                    {job.title} — {job.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Upload resume (.txt)</Label>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:bg-muted/50">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload plain text</span>
              <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div>
            <Label>Or paste resume text</Label>
            <Textarea
              className="mt-2 min-h-[200px]"
              placeholder="Paste your resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <Button
            onClick={handleMatch}
            disabled={loading}
            className="w-full gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Analyzing..." : "Run AI Match"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl"
        >
          {!result && !loading && (
            <div className="flex flex-1 flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Sparkles className="mb-4 h-12 w-12 opacity-40" />
              <p>Results will appear here after analysis</p>
            </div>
          )}

          {loading && (
            <div className="py-16 text-center text-muted-foreground">Analyzing resume...</div>
          )}

          {result && (
            <>
              <MatchScoreChart score={result.score} />
              <p className="mt-4 text-center font-medium text-foreground">
                {result.job.title} at {result.job.company}
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">{result.recommendation}</p>

              <div className="mt-8 w-full space-y-6">
                {result.matchedSkills.length > 0 && (
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Matched skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedSkills.map((s) => (
                        <span key={s} className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.missingSkills.length > 0 && (
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <XCircle className="h-4 w-4 text-destructive" />
                      Skills to develop
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((s) => (
                        <span key={s} className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeMatch;
