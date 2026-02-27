import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 celestial-bg">
      <div className="text-center">
        <p
          className="mb-2 text-6xl font-bold text-gold-500/30"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          404
        </p>
        <h1
          className="mb-4 text-2xl font-bold text-parchment-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Page Not Found
        </h1>
        <p className="mb-8 text-parchment-500">
          The celestial path you seek does not exist in this configuration.
        </p>
        <Link
          href="/"
          className="rounded-md bg-gold-500 px-6 py-2.5 text-sm font-semibold text-celestial-900 transition-colors hover:bg-gold-400"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
