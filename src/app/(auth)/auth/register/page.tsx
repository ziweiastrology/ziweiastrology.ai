"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const t = useTranslations("auth");
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
    if (!name.trim()) fe.name = t("nameRequired");
    if (!email.trim()) fe.email = t("emailRequired");
    if (!password) fe.password = t("passwordRequired");
    else if (password.length < 8) fe.password = t("passwordMinLengthFull");
    if (!confirmPassword) fe.confirmPassword = t("confirmPasswordFull");
    else if (password !== confirmPassword) fe.confirmPassword = t("passwordMismatch");

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
        setError(data.error || t("registrationFailed"));
        toast.error(data.error || t("registrationFailed"));
        setLoading(false);
        return;
      }

      toast.success(t("accountCreated"));

      // Auto sign-in after registration
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch {
      setError(t("somethingWrong"));
      toast.error(t("somethingWrong"));
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-gold-700/30 bg-celestial-800/60 p-8 shadow-xl shadow-black/30">
      <h1
        className="mb-6 text-center text-2xl font-bold text-parchment-100"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {t("beginJourney")}
      </h1>

      {error && (
        <div className="mb-4 rounded-md border border-quantum-red/30 bg-quantum-red/10 px-4 py-2.5 text-sm text-quantum-red">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-parchment-400">
            {t("fullName")}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
              placeholder={t("yourNamePlaceholder")}
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.name ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
            />
          </div>
          {fieldErrors.name && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-parchment-400">
            {t("email")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
              placeholder={t("emailPlaceholder")}
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.email ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
            />
          </div>
          {fieldErrors.email && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.email}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-parchment-400">
            {t("password")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError("password"); }}
              placeholder={t("passwordPlaceholderRegister")}
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
            {t("confirmPassword")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-600" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError("confirmPassword"); }}
              placeholder={t("confirmPasswordPlaceholder")}
              required
              className={`w-full rounded-md border bg-celestial-900/60 py-2.5 pl-10 pr-4 text-sm text-parchment-200 placeholder:text-parchment-700 focus:outline-none focus:ring-1 ${fieldErrors.confirmPassword ? "border-quantum-red/50 focus:border-quantum-red focus:ring-quantum-red/30" : "border-gold-700/30 focus:border-gold-500 focus:ring-gold-500/50"}`}
            />
          </div>
          {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-quantum-red">{fieldErrors.confirmPassword}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("creatingAccount") : t("signUp")}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gold-700/20" />
        <span className="text-xs text-parchment-600">{t("or")}</span>
        <div className="h-px flex-1 bg-gold-700/20" />
      </div>

      {/* Social OAuth */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          {t("continueWithGoogle")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
        >
          {t("continueWithFacebook")}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-parchment-500">
        {t("haveAccount")}{" "}
        <Link
          href="/auth/login"
          className="font-medium text-gold-400 hover:text-gold-300"
        >
          {t("signInLink")}
        </Link>
      </p>
    </div>
  );
}
