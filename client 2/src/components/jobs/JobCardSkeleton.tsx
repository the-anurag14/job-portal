import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => (
  <div className="rounded-2xl border border-border bg-card p-6 card-shadow">
    <div className="mb-4 flex items-start justify-between">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-5 w-5 rounded" />
    </div>
    <Skeleton className="mb-2 h-5 w-3/4" />
    <Skeleton className="mb-4 h-4 w-1/2" />
    <div className="mb-5 flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>
    <Skeleton className="h-4 w-full" />
  </div>
);

export default JobCardSkeleton;
