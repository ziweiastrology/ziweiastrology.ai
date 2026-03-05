"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { useDashboardStore } from "@/stores/useDashboardStore";

const REASON_SUBTITLES: Record<string, string> = {
  palace: "Unlock this palace to explore its full star configuration.",
  copilot: "Chat with ZiWei Sifu AI for personalized chart insights.",
  full_reading: "Register to save your chart and unlock all 12 palaces.",
};

type Mode = "register" | "login";

export default function AuthModal() {
  const authModalOpen = useDashboardStore((s) => s.authModalOpen);
  const authModalReason = useDashboardStore((s) => s.authModalReason);
  const closeAuthModal = useDashboardStore((s) => s.closeAuthModal);
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const subtitle = authModalReason ? REASON_SUBTITLES[authModalReason] : "";

  function clearFieldError(field: string) {
    setFieldErrors((p) => {
      const n = { ...p };
      delete n[field];
      return n;
    });
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setError("");
    setFieldErrors({});
  }

  function switchMode(m: Mode) {
    resetForm();
    setMode(m);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const fe: Record<string, string> = {};
    if (!email.trim()) fe.email = "Email is required";
    if (!password) fe.password = "Password is required";
    if (Object.keys(fe).length > 0) {
      setFieldErrors(fe);
      return;
    }
    setFieldErrors({});
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      closeAuthModal();
      router.refresh();
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const fe: Record<string, string> = {};
    if (!name.trim()) fe.name = "Name is required";
    if (!email.trim()) fe.email = "Email is required";
    if (!password) fe.password = "Password is required";
    else if (password.length < 8) fe.password = "At least 8 characters";
    if (!confirmPassword) fe.confirmPassword = "Please confirm password";
    else if (password !== confirmPassword) fe.confirmPassword = "Passwords don't match";
    if (Object.keys(fe).length > 0) {
      setFieldErrors(fe);
      return;
    }
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        toast.error(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Account created! Signing you in...");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Try logging in.");
        setLoading(false);
      } else {
        closeAuthModal();
        router.refresh();
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong.");
      setLoading(false);
    }
  }

  const inputCls = (field: string) =>
    `w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${
      fieldErrors[field]
        ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30"
        : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"
    }`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeAuthModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border border-gold-700/30 bg-celestial-900 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-3 top-3 rounded-md p-1 text-parchment-500 hover:text-parchment-200 transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="text-center space-y-2">
            <h3
              className="text-lg font-bold text-gold-300"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {mode === "register" ? "Create Your Account" : "Welcome Back"}
            </h3>
            {subtitle && (
              <p className="text-sm text-parchment-400">{subtitle}</p>
            )}
            {mode === "register" && (
              <p className="text-xs text-quantum-green/80">
                +5 bonus credits on registration
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-md border border-quantum-red/30 bg-quantum-red/10 px-4 py-2.5 text-sm text-quantum-red">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={mode === "register" ? handleRegister : handleLogin}
            className="space-y-4"
          >
            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-sm text-parchment-400">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearFieldError("name");
                    }}
                    placeholder="Your name"
                    required
                    className={inputCls("name")}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-quantum-red">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm text-parchment-400">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  placeholder="you@example.com"
                  required
                  className={inputCls("email")}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-quantum-red">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-parchment-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  placeholder={
                    mode === "register" ? "At least 8 characters" : "Your password"
                  }
                  required
                  className={`${inputCls("password").replace("pr-4", "pr-10")}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment-600 hover:text-parchment-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-quantum-red">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {mode === "register" && (
              <div>
                <label className="mb-1.5 block text-sm text-parchment-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearFieldError("confirmPassword");
                    }}
                    placeholder="Repeat your password"
                    required
                    className={inputCls("confirmPassword")}
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-quantum-red">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? mode === "register"
                  ? "Creating account..."
                  : "Signing in..."
                : mode === "register"
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gold-700/20" />
            <span className="text-xs text-parchment-600">or</span>
            <div className="h-px flex-1 bg-gold-700/20" />
          </div>

          {/* Google OAuth */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Continue with Google
            </Button>
            <p className="text-[10px] text-center text-parchment-600">
              Google sign-in will reload the page. You may need to re-enter your
              birth details.
            </p>
          </div>

          {/* Toggle mode */}
          <p className="text-center text-sm text-parchment-500">
            {mode === "register" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-medium text-gold-400 hover:text-gold-300"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-medium text-gold-400 hover:text-gold-300"
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
