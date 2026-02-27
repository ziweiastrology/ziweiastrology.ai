import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-celestial-800/40",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/20 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
