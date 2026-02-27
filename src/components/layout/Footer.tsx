import Image from "next/image";
import Link from "next/link";
import {
  BookOpen, Users, GraduationCap, Info, Mail, FlaskConical,
  Youtube, Facebook, Instagram, Github, Send,
} from "lucide-react";

/* Custom SVG icons for platforms lucide-react doesn't cover */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.97a8.22 8.22 0 004.77 1.52V7.04a4.84 4.84 0 01-1-.35z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.462.342.342 0 00-.462 0c-.545.533-1.684.73-2.512.73-.828 0-1.967-.182-2.512-.73a.345.345 0 00-.205-.095z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "#", label: "YouTube", icon: Youtube },
  { href: "#", label: "X", icon: XIcon },
  { href: "#", label: "Facebook", icon: Facebook },
  { href: "#", label: "TikTok", icon: TikTokIcon },
  { href: "#", label: "Telegram", icon: Send },
  { href: "#", label: "Reddit", icon: RedditIcon },
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "GitHub", icon: Github },
];

const FOOTER_LINKS = {
  Platform: [
    { href: "/about", label: "About Us", icon: Info },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/case-studies", label: "Case Studies", icon: FlaskConical },
    { href: "/community", label: "Community", icon: Users },
    { href: "/academy", label: "Academy", icon: GraduationCap },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Nebula background layer — bold clouds */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 15% 90%, rgba(140, 50, 180, 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 100% 70% at 80% 10%, rgba(210, 100, 40, 0.35) 0%, transparent 50%),
            radial-gradient(ellipse 80% 90% at 50% 50%, rgba(180, 40, 100, 0.28) 0%, transparent 45%),
            radial-gradient(ellipse 130% 60% at 5% 20%, rgba(60, 20, 140, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 90% 70% at 90% 75%, rgba(90, 50, 200, 0.4) 0%, transparent 45%),
            radial-gradient(ellipse 60% 50% at 40% 10%, rgba(220, 140, 50, 0.2) 0%, transparent 40%),
            radial-gradient(ellipse 70% 60% at 65% 80%, rgba(160, 60, 120, 0.3) 0%, transparent 45%),
            linear-gradient(180deg, #0c0418 0%, #10062a 35%, #160930 70%, #0e0620 100%)
          `,
        }}
      />

      {/* Secondary nebula wisps — adds depth */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 30% 70%, rgba(200, 80, 160, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 40% 35% at 70% 35%, rgba(240, 160, 60, 0.3) 0%, transparent 45%),
            radial-gradient(ellipse 60% 45% at 20% 40%, rgba(100, 60, 200, 0.4) 0%, transparent 50%)
          `,
        }}
      />

      {/* Star field layer — static dots */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1.5px 1.5px at 10% 15%, #fff 0%, transparent 100%),
            radial-gradient(1px 1px at 22% 42%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(2px 2px at 38% 8%, rgba(255,220,150,1) 0%, transparent 100%),
            radial-gradient(1px 1px at 52% 28%, #fff 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 52%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 15%, rgba(255,220,150,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 88% 38%, #fff 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 62%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 68%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(2px 2px at 18% 82%, rgba(255,220,150,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 32% 65%, #fff 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 45% 88%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 58% 72%, rgba(255,220,150,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 92%, #fff 0%, transparent 100%),
            radial-gradient(2px 2px at 85% 78%, rgba(255,220,150,1) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 48%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 22%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 15% 55%, rgba(255,220,150,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 38%, #fff 0%, transparent 100%),
            radial-gradient(1px 1px at 3% 92%, rgba(255,255,255,0.7) 0%, transparent 100%)
          `,
        }}
      />

      {/* Twinkling stars — group A */}
      <div
        className="absolute inset-0 animate-[star-twinkle_4s_ease-in-out_infinite]"
        style={{
          background: `
            radial-gradient(3px 3px at 25% 20%, rgba(255,220,150,1) 0%, transparent 100%),
            radial-gradient(2.5px 2.5px at 68% 55%, #fff 0%, transparent 100%),
            radial-gradient(3px 3px at 45% 85%, rgba(255,220,150,1) 0%, transparent 100%),
            radial-gradient(2px 2px at 82% 15%, #fff 0%, transparent 100%)
          `,
        }}
      />
      {/* Twinkling stars — group B (offset timing) */}
      <div
        className="absolute inset-0 animate-[star-twinkle_5s_ease-in-out_1.5s_infinite]"
        style={{
          background: `
            radial-gradient(3px 3px at 12% 70%, #fff 0%, transparent 100%),
            radial-gradient(2.5px 2.5px at 88% 35%, rgba(255,220,150,1) 0%, transparent 100%),
            radial-gradient(2px 2px at 55% 12%, #fff 0%, transparent 100%),
            radial-gradient(3px 3px at 35% 45%, rgba(255,220,150,1) 0%, transparent 100%)
          `,
        }}
      />
      {/* Twinkling stars — group C (slower) */}
      <div
        className="absolute inset-0 animate-[star-twinkle_6s_ease-in-out_3s_infinite]"
        style={{
          background: `
            radial-gradient(2.5px 2.5px at 50% 30%, #fff 0%, transparent 100%),
            radial-gradient(3px 3px at 75% 75%, rgba(255,220,150,1) 0%, transparent 100%),
            radial-gradient(2px 2px at 8% 40%, rgba(255,255,255,0.9) 0%, transparent 100%)
          `,
        }}
      />

      {/* Top edge glow — luminous line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,160,60,0.6) 15%, rgba(140,60,180,0.8) 50%, rgba(200,160,60,0.6) 85%, transparent 100%)",
        }}
      />
      {/* Top edge soft bloom */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(140,60,180,0.15) 0%, rgba(100,40,160,0.05) 40%, transparent 100%)",
        }}
      />

      {/* Footer content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-1">
              <Image
                src="/logo.jpg"
                alt="Ziwei Astrology"
                width={108}
                height={108}
                className="rounded-full mix-blend-screen"
              />
              <p
                className="text-lg font-bold tracking-wider text-gold-400"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Ziwei Astrology
              </p>
            </div>
            <p className="mt-2 text-sm text-parchment-600">
              Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling.
              Decode your reality.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-celestial-800/60 text-parchment-500 transition-colors hover:bg-celestial-700/80 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-500"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Platform
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.Platform.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-parchment-500 transition-colors hover:text-gold-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-500"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.Legal.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-parchment-500 transition-colors hover:text-gold-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-500"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Contact
            </h4>
            <a
              href="mailto:hello@ziweiastrology.ai"
              className="flex items-center gap-2 text-sm text-parchment-500 transition-colors hover:text-gold-400"
            >
              <Mail className="h-4 w-4" />
              hello@ziweiastrology.ai
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-gold-700/20 pt-6 text-center">
          <p
            className="text-xs text-parchment-600/60 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            &copy; {new Date().getFullYear()} ziweiastrology.ai — Ancient
            wisdom. Quantum precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
