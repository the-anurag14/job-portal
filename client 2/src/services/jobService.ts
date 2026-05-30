import API from "./api";
import type {
  ApplicantsResponse,
  ApplicationsResponse,
  Job,
  JobsResponse,
  MatchResult,
} from "@/types";

export const jobService = {
  getJobs: () => API.get<JobsResponse>("/jobs"),

  getJob: (jobId: string) => API.get<{ job: Job }>(`/jobs/${jobId}`),

  searchJobs: (params: { keyword?: string; location?: string; skill?: string }) =>
    API.get<JobsResponse>("/jobs/search", { params }),

  postJob: (data: Partial<Job>) => API.post("/jobs", data),

  apply: (jobId: string) => API.post(`/jobs/${jobId}/apply`),

  getMyApplications: () => API.get<ApplicationsResponse>("/jobs/my-applications"),

  getMyJobs: () => API.get<JobsResponse>("/jobs/my-jobs"),

  getApplicants: (jobId: string) =>
    API.get<ApplicantsResponse>(`/jobs/applicants/${jobId}`),

  matchResume: (resumeText: string, jobId: string) =>
    API.post<MatchResult>("/jobs/match", { resumeText, jobId }),
};
