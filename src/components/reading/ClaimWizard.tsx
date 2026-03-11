"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { CheckCircle, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import BirthDetailsForm from "@/components/BirthDetailsForm";
import type { BirthDetails } from "@/types";

type Step = "verify" | "auth" | "birth" | "generate" | "done";

interface PurchaseState {
  purchaseId: string | null;
  status: string | null;
  error: string | null;
}

export default function ClaimWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const cbReceipt = searchParams.get("cbreceipt") || searchParams.get("item") || "";
  const cbEmail = searchParams.get("cbemail") || searchParams.get("email") || "";

  const [step, setStep] = useState<Step>("verify");
  const [purchase, setPurchase] = useState<PurchaseState>({
    purchaseId: null,
    status: null,
    error: null,
  });
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: cbEmail,
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Step 1: Verify purchase
  const verifyPurchase = useCallback(async () => {
    if (!cbReceipt || !cbEmail) {
      setPurchase({ purchaseId: null, status: null, error: "Missing receipt or email in URL." });
      return;
    }

    try {
      const res = await fetch("/api/clickbank/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cbReceipt, email: cbEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          // IPN may be delayed — poll
          return false;
        }
        setPurchase({ purchaseId: null, status: null, error: data.error || "Verification failed" });
        return true;
      }

      setPurchase({ purchaseId: data.purchaseId, status: data.status, error: null });

      if (data.authenticated && data.reportId) {
        // Report already generated — go directly to it
        router.push(`/reading/report/${data.reportId}`);
      } else if (data.authenticated) {
        setStep("birth");
      } else if (data.alreadyClaimed) {
        setPurchase((p) => ({ ...p, error: "This purchase has already been claimed by another account." }));
      } else {
        setStep(session ? "birth" : "auth");
      }
      return true;
    } catch {
      setPurchase({ purchaseId: null, status: null, error: "Network error. Please try again." });
      return true;
    }
  }, [cbReceipt, cbEmail, session]);

  useEffect(() => {
    if (step !== "verify") return;

    let attempts = 0;
    const maxAttempts = 20; // 60s at 3s intervals

    const poll = async () => {
      const done = await verifyPurchase();
      if (done) return;
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(poll, 3000);
      } else {
        setPurchase({
          purchaseId: null,
          status: null,
          error: "Purchase verification timed out. Please try refreshing the page.",
        });
      }
    };

    poll();
  }, [step, verifyPurchase]);

  // After auth, re-claim to link purchase
  useEffect(() => {
    if (sessionStatus === "authenticated" && step === "auth" && purchase.purchaseId) {
      fetch("/api/clickbank/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cbReceipt, email: cbEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated && data.reportId) {
            router.push(`/reading/report/${data.reportId}`);
          } else if (data.status === "CLAIMED" || data.authenticated) {
            setPurchase((p) => ({ ...p, status: "CLAIMED" }));
            setStep("birth");
          } else if (data.error) {
            setPurchase((p) => ({ ...p, error: data.error }));
          }
        })
        .catch(console.error);
    }
  }, [sessionStatus, step, purchase.purchaseId, cbReceipt, cbEmail, router]);

  // Auth handlers
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Registration failed");
        setAuthLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email: authForm.email,
        password: authForm.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Registration succeeded but login failed. Please try logging in.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    }
    setAuthLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const result = await signIn("credentials", {
      email: authForm.email,
      password: authForm.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError("Invalid email or password");
    }
    setAuthLoading(false);
  };

  // Step 3: Birth data → compute chart → generate report
  const handleCalibrate = async (details: BirthDetails) => {
    if (!purchase.purchaseId) return;
    setGenerating(true);
    setStep("generate");

    try {
      const { computeChart } = await import("@/lib/zwds");
      const { palaces, meta } = await computeChart(details);

      const birthDate = `${details.birthYear}-${details.birthMonth.padStart(2, "0")}-${details.birthDay.padStart(2, "0")}`;
      const birthHour = parseInt(details.birthHour, 10);
      const birthGender = details.gender;

      const res = await fetch("/api/clickbank/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseId: purchase.purchaseId,
          palaces,
          meta,
          birthDate,
          birthHour,
          birthGender,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPurchase((p) => ({ ...p, error: data.error || "Report generation failed" }));
        setGenerating(false);
        return;
      }

      router.push(`/reading/report/${data.reportId}`);
    } catch (err) {
      console.error("Chart computation/report error:", err);
      setPurchase((p) => ({ ...p, error: "Failed to generate your reading. Please try again." }));
      setGenerating(false);
    }
  };

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-2 text-sm">
        {(["verify", "auth", "birth", "generate"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            {i > 0 && <div className="h-px w-6 bg-border" />}
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === s
                  ? "bg-gold-500 text-celestial-900"
                  : ["verify", "auth", "birth", "generate"].indexOf(step) > i
                    ? "bg-quantum-green text-white"
                    : "bg-surface-light text-muted"
              }`}
            >
              {["verify", "auth", "birth", "generate"].indexOf(step) > i ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: Verify Purchase */}
      {step === "verify" && (
        <div className="text-center">
          {purchase.error ? (
            <div className="rounded-lg border border-quantum-red/30 bg-quantum-red/10 p-6">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-quantum-red" />
              <p className="text-foreground">{purchase.error}</p>
            </div>
          ) : (
            <>
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-gold-500" />
              <h2 className="font-heading text-xl text-foreground">
                Verifying Your Purchase
              </h2>
              <p className="mt-2 text-sm text-muted">
                This may take a moment...
              </p>
            </>
          )}
        </div>
      )}

      {/* Step 2: Auth */}
      {step === "auth" && (
        <div>
          <h2 className="mb-2 text-center font-heading text-xl text-foreground">
            {authMode === "register" ? "Create Your Account" : "Sign In"}
          </h2>
          <p className="mb-6 text-center text-sm text-muted">
            {authMode === "register"
              ? "Create a free account to access your reading."
              : "Sign in to your existing account."}
          </p>

          <form
            onSubmit={authMode === "register" ? handleRegister : handleLogin}
            className="mx-auto max-w-sm space-y-4"
          >
            {authMode === "register" && (
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.name}
                onChange={(e) => setAuthForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => setAuthForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted"
              required
              minLength={8}
            />

            {authError && (
              <p className="text-sm text-quantum-red">{authError}</p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-3 font-semibold text-celestial-900 disabled:opacity-50"
            >
              {authLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {authMode === "register" ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-muted">
            {authMode === "register" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-gold-400 underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Need an account?{" "}
                <button
                  onClick={() => setAuthMode("register")}
                  className="text-gold-400 underline"
                >
                  Register
                </button>
              </>
            )}
          </p>
        </div>
      )}

      {/* Step 3: Birth Data */}
      {step === "birth" && (
        <div>
          <h2 className="mb-2 text-center font-heading text-xl text-foreground">
            Enter Your Birth Details
          </h2>
          <p className="mb-6 text-center text-sm text-muted">
            We need your birth information to compute your ZiWei Astrology AI chart.
          </p>
          <BirthDetailsForm onCalibrate={handleCalibrate} />
        </div>
      )}

      {/* Step 4: Generating */}
      {step === "generate" && generating && (
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-gold-500" />
          <h2 className="font-heading text-xl text-foreground">
            Generating Your Destiny Reading
          </h2>
          <p className="mt-2 text-sm text-muted">
            Our AI is analyzing your chart across all 12 palaces. This typically takes 2-3 minutes.
          </p>
        </div>
      )}

      {/* Error display for any step */}
      {purchase.error && step !== "verify" && (
        <div className="mt-6 rounded-lg border border-quantum-red/30 bg-quantum-red/10 p-4 text-center">
          <p className="text-sm text-quantum-red">{purchase.error}</p>
        </div>
      )}
    </div>
  );
}
