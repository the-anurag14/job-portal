export type UserRole = "jobseeker" | "recruiter";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: number;
  skills: string[];
  recruiter?: string | { _id: string; name: string; email: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  _id: string;
  job: Job | string;
  applicant?: string | { _id: string; name: string; email: string };
  status: "applied" | "shortlisted" | "rejected";
  createdAt?: string;
}

export interface MatchResult {
  job: { id: string; title: string; company: string };
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: string;
}

export interface JobsResponse {
  total: number;
  jobs: Job[];
}

export interface ApplicationsResponse {
  totalApplied: number;
  applications: Application[];
}

export interface ApplicantsResponse {
  totalApplicants: number;
  applications: Application[];
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ProfileResponse {
  user: User & { _id?: string };
}
