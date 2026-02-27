import { Skeleton } from "@/components/ui/Skeleton";

function CourseSkeleton() {
  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/20 p-5">
      <Skeleton className="mb-3 h-5 w-20 rounded-full" />
      <Skeleton className="mb-2 h-7 w-3/4" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-2/3" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export default function CoursesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-3 h-10 w-40" />
        <Skeleton className="mx-auto h-5 w-64" />
        <Skeleton className="mx-auto mt-6 h-px w-24" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CourseSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
