"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";

const VENDOR = process.env.NEXT_PUBLIC_CLICKBANK_VENDOR || "ziweidouai";
const PRODUCT_ITEM = "1"; // ClickBank product item number

const discoveries = [
  {
    title: "Your Nature",
    desc: "the core traits and abilities that shape your life path",
  },
  {
    title: "Your Career Direction",
    desc: "what types of work align with your destiny pattern",
  },
  {
    title: "Your Relationship Patterns",
    desc: "how your birth chart influences love and compatibility",
  },
  {
    title: "Your Wealth Potential",
    desc: "how financial opportunities appear in your destiny cycles",
  },
  {
    title: "Your Major Life Phases",
    desc: "how different periods of your life may unfold",
  },
];

const steps = [
  { num: "1", text: "Enter your birth details" },
  { num: "2", text: "Our AI analyzes your Zi Wei destiny chart" },
  { num: "3", text: "Receive your personalized destiny report instantly" },
];

const whyReasons = [
  "why certain patterns repeat in their lives",
  "what career paths feel more natural",
  "how relationships evolve over time",
  "when important life shifts may occur",
];

const includes = [
  "AI-generated destiny report",
  "Personality insights",
  "Career patterns",
  "Relationship tendencies",
  "Life cycle overview",
];

const faqs = [
  {
    q: "Is this astrology accurate?",
    a: "Zi Wei Dou Shu is a traditional Chinese astrology system with over a thousand years of history. Our AI translates complex birth chart patterns into clear, readable insights based on classical principles.",
  },
  {
    q: "Do I need to know astrology to understand the report?",
    a: "No. The report is written in plain language designed for beginners. No prior knowledge of astrology or Chinese metaphysics is needed.",
  },
  {
    q: "How fast will I receive my reading?",
    a: "Immediately after purchase. You will be redirected to create an account and enter your birth details. Your personalized destiny report is then generated in seconds and viewable in your browser. You can also download it as a PDF.",
  },
  {
    q: "What information do I need?",
    a: "Just your birth date, approximate birth time, and gender.",
  },
  {
    q: "What format is the report?",
    a: "Your report is a digital document viewable directly in your web browser. You can also download it as a PDF file. No special software is required — just a modern web browser on any device.",
  },
  {
    q: "What is the refund policy?",
    a: "ClickBank offers a 60-day money-back guarantee on all purchases. If you are not satisfied with your reading for any reason, you can request a full refund within 60 days of purchase through ClickBank's order support.",
  },
];

const upsellItems = [
  "Upcoming opportunity cycles",
  "Career momentum phases",
  "Relationship timing",
  "Personal growth windows",
];

export default function ReadingSalesPage() {
  const orderUrl = `https://${VENDOR}.pay.clickbank.net/?cbitems=${PRODUCT_ITEM}`;

  const CtaButton = () => (
    <a
      href={orderUrl}
      className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-lg font-bold text-celestial-900 shadow-lg shadow-gold-500/20 transition-all hover:bg-gold-400 hover:scale-105"
    >
      Unlock My Destiny Reading
      <ArrowRight className="h-5 w-5" />
    </a>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20">
      {/* 1. Hero */}
      <section className="py-16 text-center">
        <h1
          className="gold-gradient-text font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          style={{
            filter: "drop-shadow(0 0 20px rgba(212,165,40,0.4)) drop-shadow(0 0 60px rgba(212,165,40,0.15))",
            WebkitTextStroke: "0.5px rgba(212,165,40,0.3)",
          }}
        >
          Discover Your Destiny Using an Ancient Chinese Astrology System
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-parchment-400">
          Get a personalized AI-powered destiny reading that reveals your life
          path, career potential, relationship patterns, and future
          opportunities — based on your birth chart.
        </p>
        <div className="mt-8">
          <CtaButton />
          <p className="mt-4 text-sm text-muted">
            One-time reading · Instant AI analysis · Only $27
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="mt-12">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gold-700/30 shadow-2xl shadow-gold-500/10">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/SuMjNFxHbYo?rel=0"
              title="ZiWei Astrology AI — Destiny Reading"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 2. Curiosity Hook */}
      <section className="mt-16 rounded-xl border border-border bg-surface/70 backdrop-blur-sm p-8">
        <p className="text-lg text-parchment-400">
          For over a thousand years, Chinese scholars used an advanced system
          called <span className="text-gold-400">Zi Wei Dou Shu</span> to
          interpret destiny patterns hidden in birth charts.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "Personality strengths",
            "Career potential",
            "Relationship patterns",
            "Financial cycles",
            "Life turning points",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-parchment-400">
              <Check className="h-4 w-4 shrink-0 text-quantum-green" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-parchment-400">
          But traditionally, only trained masters could read these charts.{" "}
          <span className="font-semibold text-foreground">Until now.</span>
        </p>
        <p className="mt-4 text-parchment-400">
          ZiWeiAI uses advanced AI to translate this ancient system into a clear
          and personalized report anyone can understand.
        </p>
      </section>

      {/* 3. What You Will Discover */}
      <section className="mt-16">
        <h2 className="mb-8 text-center font-heading text-2xl text-foreground">
          What You Will Discover
        </h2>
        <div className="space-y-4">
          {discoveries.map((d) => (
            <div
              key={d.title}
              className="flex items-start gap-4 rounded-lg border border-border bg-surface/70 backdrop-blur-sm p-5"
            >
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <div>
                <h3 className="font-semibold text-foreground">{d.title}</h3>
                <p className="text-sm text-parchment-400">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="mt-16">
        <h2 className="mb-8 text-center font-heading text-2xl text-foreground">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-lg border border-border bg-surface/70 backdrop-blur-sm p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-celestial-900">
                {s.num}
              </div>
              <p className="text-parchment-400">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Your report is generated in seconds using advanced AI trained on
          traditional Chinese astrology principles.
        </p>
      </section>

      {/* 5. Sample Insight Preview */}
      <section className="mt-16">
        <h2 className="mb-2 text-center font-heading text-2xl text-foreground">
          A Glimpse Into Your Report
        </h2>
        <p className="mb-8 text-center text-sm text-muted">
          Real excerpts from an AI-generated destiny reading
        </p>
        <div className="relative overflow-hidden rounded-xl border border-gold-700/50 bg-surface/60 backdrop-blur-sm">
          {/* Report-style content */}
          <div className="divide-y divide-border/50">
            <blockquote className="flex gap-4 p-6">
              <div className="w-1 shrink-0 rounded-full bg-gold-500" />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-500">
                  Career &amp; Wealth Palace
                </p>
                <p className="text-parchment-400 leading-relaxed">
                  &ldquo;Your chart shows strong leadership energy but delayed
                  financial stability. Your most productive career phase begins
                  later than average, but it brings long-term success.&rdquo;
                </p>
              </div>
            </blockquote>
            <blockquote className="flex gap-4 p-6">
              <div className="w-1 shrink-0 rounded-full bg-gold-500" />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-500">
                  Personality &amp; Talent Palace
                </p>
                <p className="text-parchment-400 leading-relaxed">
                  &ldquo;Your destiny pattern indicates strong intuition and
                  strategic thinking, making you well suited for roles involving
                  guidance, planning, or analysis.&rdquo;
                </p>
              </div>
            </blockquote>
          </div>
          {/* Fade-out overlay — teases more content below */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-celestial-900/90 to-transparent" />
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          Your full report covers all 12 palaces with personalized insights.
        </p>
      </section>

      {/* 6. Why People Use Destiny Readings */}
      <section className="mt-16 rounded-xl border border-border bg-surface/70 backdrop-blur-sm p-8">
        <h2 className="mb-6 font-heading text-2xl text-foreground">
          Why People Use Destiny Readings
        </h2>
        <p className="mb-4 text-parchment-400">
          People seek destiny analysis to better understand:
        </p>
        <ul className="space-y-3">
          {whyReasons.map((reason) => (
            <li key={reason} className="flex items-center gap-3 text-parchment-400">
              <span className="text-gold-500">&#x2022;</span>
              {reason}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-parchment-400">
          Zi Wei Dou Shu focuses on patterns and timing, helping people reflect
          on their life direction.
        </p>
      </section>

      {/* 7. Offer + Guarantee */}
      <section className="mt-16 rounded-xl border-2 border-gold-700 bg-surface/80 backdrop-blur-sm p-8 text-center">
        <h2 className="font-heading text-3xl text-foreground">Only $27</h2>
        <p className="mx-auto mt-2 text-parchment-400">
          One-time payment. Your complete destiny reading includes:
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {includes.map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-parchment-400">
              <Check className="h-4 w-4 text-quantum-green" />
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-parchment-400">
          Digital report delivered instantly after purchase. Viewable in browser, downloadable as PDF.
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-quantum-green/30 bg-quantum-green/10 px-4 py-1.5 text-sm text-quantum-green">
          <Check className="h-4 w-4" />
          60-Day Money-Back Guarantee
        </div>
        <div className="mt-6">
          <CtaButton />
        </div>
      </section>

      {/* 8. After Your Reading (Upsell Teaser) */}
      <section className="mt-16 rounded-lg border border-border bg-surface/70 backdrop-blur-sm p-8">
        <h2 className="mb-4 font-heading text-2xl text-foreground">
          After Your Reading
        </h2>
        <p className="text-parchment-400">
          Many users choose to upgrade their analysis with:
        </p>
        <div className="mt-4 rounded-lg border border-border bg-surface/50 p-5">
          <h3 className="font-semibold text-gold-400">
            10-Year Destiny Forecast
          </h3>
          <ul className="mt-3 space-y-2">
            {upsellItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-parchment-400">
                <Check className="h-4 w-4 shrink-0 text-quantum-green" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-muted">
          Available as an add-on after your reading is generated.
        </p>
      </section>

      {/* 9. FAQ */}
      <section className="mt-16">
        <h2 className="mb-8 text-center font-heading text-2xl text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-lg border border-border bg-surface/70 backdrop-blur-sm p-4"
            >
              <summary className="cursor-pointer font-semibold text-foreground marker:text-gold-500">
                {faq.q}
              </summary>
              <p className="mt-3 text-sm text-parchment-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="mt-16 text-center">
        <p className="text-lg text-parchment-400">
          Your destiny chart already exists. Now discover what it reveals.
        </p>
        <div className="mt-6">
          <CtaButton />
          <p className="mt-4 text-sm text-muted">
            One-time payment of $27 · Digital report · Instant delivery · 60-day guarantee
          </p>
        </div>
      </section>

      {/* ClickBank Required Footer */}
      <footer className="mt-20 border-t border-border/50 pt-8 text-xs text-parchment-600 space-y-4">
        {/* Contact & Support */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
          <p>
            For Product Support, please contact the seller{" "}
            <a href="mailto:support@ziweiastrology.ai" className="text-gold-400 underline hover:text-gold-300">
              HERE
            </a>.
          </p>
          <p>
            For Order Support, please contact ClickBank{" "}
            <a href="https://www.clkbank.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 underline hover:text-gold-300">
              HERE
            </a>.
          </p>
        </div>

        {/* ClickBank Disclaimer */}
        <p className="mx-auto max-w-3xl text-center leading-relaxed">
          ClickBank is the retailer of products on this site. CLICKBANK® is a
          registered trademark of Click Sales, Inc., a Delaware corporation
          located at 1444 S. Entertainment Ave., Suite 410 Boise, ID 83709, USA
          and used by permission. ClickBank&apos;s role as retailer does not
          constitute an endorsement, approval or review of these products or any
          claim, statement or opinion used in promotion of these products.
        </p>

        {/* Product & Refund Info */}
        <p className="mx-auto max-w-3xl text-center leading-relaxed">
          This is a digital product. After purchase, you will be redirected to
          create an account and enter your birth details. Your personalized
          destiny report is generated instantly and is viewable in your web
          browser. You may also download it as a PDF. No physical product will be
          shipped. ClickBank&apos;s 60-day money-back guarantee applies to all
          purchases.
        </p>

        <p className="text-center text-parchment-700">
          © {new Date().getFullYear()} ZiWeiAstrology.ai · All rights reserved
        </p>
      </footer>
    </div>
  );
}
