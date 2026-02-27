"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { celebritySubmissionSchema, type CelebritySubmissionInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "Health", label: "Health & Longevity" },
  { value: "Career", label: "Career & Achievement" },
  { value: "Relationships", label: "Relationships & Marriage" },
  { value: "Children", label: "Children & Legacy" },
  { value: "Property", label: "Property & Wealth" },
];

export default function CelebritySubmissionForm() {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CelebritySubmissionInput>({
    resolver: zodResolver(celebritySubmissionSchema),
    defaultValues: {
      birthTimeVerified: false,
    },
  });

  const onSubmit = async (data: CelebritySubmissionInput) => {
    if (!session?.user) {
      toast.info("Sign in to submit a case study request");
      return;
    }

    try {
      const res = await fetch("/api/case-studies/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Submission received! We'll review it soon.");
        reset();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to submit");
      }
    } catch {
      toast.error("Failed to submit");
    }
  };

  if (submitted) {
    return (
      <div className="gold-frame rounded-lg bg-celestial-800/60 p-8 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-gold-400" />
        <h3
          className="mt-4 text-lg font-semibold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Submission Received
        </h3>
        <p className="mt-2 text-sm text-parchment-500">
          Our team will review your request and may reach out for additional details.
          Approved submissions will appear in the Case Studies section.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded-md bg-gold-500/20 px-4 py-2 text-sm font-medium text-gold-400 transition-colors hover:bg-gold-500/30"
        >
          Submit Another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-gold-700/20 bg-celestial-900/40 px-3 py-2 text-sm text-parchment-200 placeholder:text-parchment-700 focus:border-gold-500 focus:outline-none transition-colors";
  const labelClass = "block text-xs font-medium text-parchment-400 mb-1.5";
  const errorClass = "mt-1 text-xs text-quantum-red/80";

  return (
    <div className="gold-frame rounded-lg bg-celestial-800/60 p-6">
      {/* Disclaimer */}
      <div className="mb-6 flex gap-3 rounded-md border border-gold-500/20 bg-gold-500/5 p-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
        <p className="text-xs leading-relaxed text-parchment-400">
          Birth times for public figures are often unverifiable. Analysis without
          confirmed birth time will be marked as approximate — the general
          direction remains valid, but detailed timing predictions may vary.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Person&apos;s Name <span className="text-quantum-red/60">*</span>
            </label>
            <input
              {...register("subjectName")}
              placeholder="e.g. Steve Jobs"
              className={cn(inputClass, errors.subjectName && "border-quantum-red/40")}
            />
            {errors.subjectName && (
              <p className={errorClass}>{errors.subjectName.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Chinese Name</label>
            <input
              {...register("subjectNameCn")}
              placeholder="e.g. 乔布斯"
              className={inputClass}
            />
          </div>
        </div>

        {/* Birth date + time row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Birth Date <span className="text-quantum-red/60">*</span>
            </label>
            <input
              {...register("birthDate")}
              type="date"
              className={cn(inputClass, errors.birthDate && "border-quantum-red/40")}
            />
            {errors.birthDate && (
              <p className={errorClass}>{errors.birthDate.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Birth Time</label>
            <input
              {...register("birthTime")}
              type="time"
              className={inputClass}
            />
            <label className="mt-1.5 flex items-center gap-1.5 text-xs text-parchment-600">
              <input
                {...register("birthTimeVerified")}
                type="checkbox"
                className="rounded border-gold-700/30 bg-celestial-900/40"
              />
              Time is verified from a reliable source
            </label>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Birth Location</label>
          <input
            {...register("birthLocation")}
            placeholder="e.g. San Francisco, CA, USA"
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>
            Topic of Interest <span className="text-quantum-red/60">*</span>
          </label>
          <select
            {...register("category")}
            className={cn(inputClass, errors.category && "border-quantum-red/40")}
          >
            <option value="">Select a topic...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={errorClass}>{errors.category.message}</p>
          )}
        </div>

        {/* Context */}
        <div>
          <label className={labelClass}>Why this person?</label>
          <textarea
            {...register("context")}
            rows={3}
            placeholder="Briefly describe why you'd like to see this person's Zi Wei chart analyzed..."
            className={cn(inputClass, "resize-none")}
          />
        </div>

        {/* Source URL */}
        <div>
          <label className={labelClass}>Reference URL</label>
          <input
            {...register("sourceUrl")}
            type="url"
            placeholder="https://en.wikipedia.org/wiki/..."
            className={cn(inputClass, errors.sourceUrl && "border-quantum-red/40")}
          />
          {errors.sourceUrl && (
            <p className={errorClass}>{errors.sourceUrl.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !session?.user}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-gold-600/80 to-gold-500/80 px-4 py-2.5 text-sm font-semibold text-celestial-900 transition-all hover:from-gold-500 hover:to-gold-400 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {isSubmitting ? "Submitting..." : "Submit Case Study Request"}
        </button>

        {!session?.user && (
          <p className="text-center text-xs text-parchment-600">
            Please sign in to submit a request.
          </p>
        )}
      </form>
    </div>
  );
}
