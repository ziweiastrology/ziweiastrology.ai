"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatar: string;
  credentials: string[];
}

const TEAM: TeamMember[] = [
  {
    name: "Master Chen",
    role: "Chief Astrologer",
    specialty: "Flying Star School (飞星派) Zi Wei Dou Shu",
    avatar: "/team/master-chen.svg",
    bio: "4th-generation Zi Wei practitioner trained in the Flying Star lineage. Over 30 years of full-time chart analysis and 10,000+ individual consultations spanning Hong Kong, Taipei, and Singapore. Master Chen bridges classical technique with modern statistical validation — he personally verified the accuracy frameworks that underpin our AI models.",
    credentials: [
      "10,000+ consultations",
      "30 years practice",
      "Flying Star lineage",
    ],
  },
  {
    name: "Dr. Wei Lin",
    role: "Head of Research",
    specialty: "Computational Astrology & Pattern Recognition",
    avatar: "/team/dr-wei-lin.svg",
    bio: "PhD in Applied Mathematics from Tsinghua University with post-doctoral research at MIT on time-series pattern recognition. Dr. Lin pioneered the statistical framework for validating Zi Wei predictions against historical outcomes — converting a millennia-old system into testable hypotheses. He leads our AI model development and ensures every algorithm respects the mathematical rigor of the original system.",
    credentials: [
      "PhD Tsinghua",
      "Post-doc MIT",
      "AI model architect",
    ],
  },
  {
    name: "Sarah Zhang",
    role: "Lead Engineer",
    specialty: "Full-Stack Development & ML Infrastructure",
    avatar: "/team/sarah-zhang.svg",
    bio: "Former senior engineer at Stripe, where she built real-time fraud detection pipelines processing millions of transactions. At ZiWei Astrology AI, Sarah architected the calculation engine that computes Zi Wei charts in under 50ms and the AI copilot that translates ancient formulas into actionable natural-language insights. She ensures the platform is as precise as the system it models.",
    credentials: [
      "Ex-Stripe",
      "Sub-50ms charts",
      "ML pipeline architect",
    ],
  },
  {
    name: "James Ong",
    role: "Community Director",
    specialty: "Education & Practitioner Certification",
    avatar: "/team/james-ong.svg",
    bio: "12 years teaching Zi Wei Dou Shu across Southeast Asia — from weekend workshops in Kuala Lumpur to semester-long masterclasses in Singapore. James developed our tiered certification curriculum that has trained 500+ practitioners. He leads community engagement, curates educational content, and ensures every resource meets the standard of a tradition that demands both depth and integrity.",
    credentials: [
      "500+ practitioners trained",
      "12 years teaching",
      "Curriculum designer",
    ],
  },
];

export default function TeamGrid() {
  return (
    <section className="py-16">
      <h2
        className="mb-4 text-center text-2xl font-bold text-gold-400 sm:text-3xl"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        The Team
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-parchment-500">
        Bridging centuries of wisdom with modern computation.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        {TEAM.map((member, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all duration-300 hover:border-gold-700/40 hover:bg-celestial-800/50"
          >
            {/* Header row: avatar + name */}
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-gold-500/40 transition-all duration-300 group-hover:border-gold-500/70">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-bold text-parchment-100"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-gold-400">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-parchment-500">
                  {member.specialty}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4 border-t border-gold-700/15 pt-4">
              <p className="text-sm leading-relaxed text-parchment-400">
                {member.bio}
              </p>
            </div>

            {/* Credential tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {member.credentials.map((cred) => (
                <span
                  key={cred}
                  className="rounded-full bg-gold-500/10 px-3 py-1 text-[11px] font-medium text-gold-400/80"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
