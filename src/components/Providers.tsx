"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { getQueryClient } from "@/lib/queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "hsl(260 40% 10%)",
              border: "1px solid hsl(40 50% 30% / 0.3)",
              color: "hsl(40 30% 85%)",
            },
          }}
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}
