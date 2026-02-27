import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";

export default function ResourcesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-3 h-10 w-48" />
        <Skeleton className="mx-auto h-5 w-72" />
        <Skeleton className="mx-auto mt-6 h-px w-24" />
      </div>

      {/* Filter skeleton */}
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
