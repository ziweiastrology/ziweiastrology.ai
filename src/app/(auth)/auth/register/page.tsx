"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function clearFieldError(field: string) {
    setFieldErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const fe: Record<string, string> = {};
    if (!name.trim()) fe.name = "Name is required";
    if (!email.trim()) fe.email = "Email is required";
    if (!password) fe.password = "Password is required";
    else if (password.length < 8) fe.password = "Password must be at least 8 characters";
    if (!confirmPassword) fe.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) fe.confirmPassword = "Passwords don't match";

    if (Object.keys(fe).length > 0) { setFieldErrors(fe); return; }
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

      // Auto sign-in after registration
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-gold-700/30 bg-celestial-800/60 p-8 shadow-xl shadow-black/30">
      <h1
        className="mb-6 text-center text-2xl font-bold text-parchment-100"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Begin Your Journey
      </h1>

      {error && (
        <div className="mb-4 rounded-md border border-quantum-red/30 bg-quantum-red/10 px-4 py-2.5 text-sm text-quantum-red">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-parchment-400">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
              placeholder="Your name"
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.name ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
            />
          </div>
          {fieldErrors.name && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-parchment-400">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
              placeholder="you@example.com"
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.email ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
            />
          </div>
          {fieldErrors.email && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.email}</p>}
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
              onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
              placeholder="At least 8 characters"
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-10 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.password ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
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
          {fieldErrors.password && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.password}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-parchment-400">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }}
              placeholder="Repeat your password"
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.confirmPassword ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
            />
          </div>
          {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.confirmPassword}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gold-700/20" />
        <span className="text-xs text-parchment-600">or</span>
        <div className="h-px flex-1 bg-gold-700/20" />
      </div>

      {/* Google OAuth */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-parchment-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-gold-400 hover:text-gold-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
