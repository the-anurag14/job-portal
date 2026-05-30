import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-8 py-12 text-center">
    <AlertCircle className="mb-4 h-10 w-10 text-destructive" />
    <p className="text-sm text-muted-foreground">{message}</p>
    {onRetry && (
      <Button variant="outline" onClick={onRetry} className="mt-4 gap-2">
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    )}
  </div>
);

export default ErrorState;
