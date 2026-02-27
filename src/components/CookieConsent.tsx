"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "ziwei-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold-700/20 bg-celestial-900/95 backdrop-blur-md p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row">
        <p className="flex-1 text-sm text-parchment-400">
          We use cookies for authentication and analytics to improve your
          experience. By continuing, you agree to our{" "}
          <Link
            href="/privacy"
            className="text-gold-400 underline hover:text-gold-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="rounded-md border border-gold-700/30 px-4 py-2 text-sm text-parchment-400 transition-colors hover:bg-celestial-800"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-gold-500/20 px-4 py-2 text-sm font-medium text-gold-400 transition-colors hover:bg-gold-500/30"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
