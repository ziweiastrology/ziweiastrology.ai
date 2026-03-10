import type { Role, Tier } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role?: Role;
    tier?: Tier;
    avatarUrl?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatarUrl?: string | null;
      role: Role;
      tier: Tier;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    tier?: Tier;
    avatarUrl?: string | null;
  }
}
