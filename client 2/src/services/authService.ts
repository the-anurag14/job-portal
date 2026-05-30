import API from "./api";
import type { AuthResponse, ProfileResponse, RegisterResponse, User, UserRole } from "@/types";

export const authService = {
  register: (data: { name: string; email: string; password: string; role: UserRole }) =>
    API.post<RegisterResponse>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    API.post<AuthResponse>("/auth/login", data),

  getProfile: () => API.get<ProfileResponse>("/auth/profile"),
};

export const normalizeUser = (raw: ProfileResponse["user"] | User): User => ({
  id: raw.id || (raw as { _id?: string })._id || "",
  name: raw.name,
  email: raw.email,
  role: raw.role,
});
