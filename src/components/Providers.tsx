"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import { getQueryClient } from "@/lib/queryClient";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
