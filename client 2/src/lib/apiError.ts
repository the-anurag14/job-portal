import axios from "axios";

export const getApiErrorMessage = (
  err: unknown,
  fallback = "Something went wrong"
): string => {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return "Cannot reach the API. Start the backend: npm run dev (port 8000).";
    }
    const data = err.response.data as { message?: string; error?: string } | undefined;
    return data?.message || data?.error || `${fallback} (${err.response.status})`;
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
};
