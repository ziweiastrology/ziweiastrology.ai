"use client";

import { Button } from "@/components/ui/Button";

export default function LandingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h2
          className="mb-2 text-2xl font-bold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Something went wrong
        </h2>
        <p className="mb-6 text-sm text-parchment-500">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
