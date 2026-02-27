import { Skeleton } from "@/components/ui/Skeleton";

function PostSkeleton() {
  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/20 p-5">
      <div className="mb-3 flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div>
          <Skeleton className="mb-1 h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <div className="mt-4 flex gap-4">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export default function FeedLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
