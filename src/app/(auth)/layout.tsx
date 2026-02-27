import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 celestial-bg">
      <Link
        href="/"
        className="mb-8 flex flex-col items-center gap-3"
      >
        <Image
          src="/logo.jpg"
          alt="Ziwei Astrology"
          width={64}
          height={64}
          className="rounded-full mix-blend-screen"
        />
        <p
          className="text-xl font-bold tracking-wider text-gold-400"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Ziwei Astrology
        </p>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
