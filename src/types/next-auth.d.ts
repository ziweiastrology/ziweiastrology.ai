import type { Role, Tier } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role?: Role;
    tier?: Tier;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
      tier: Tier;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    tier?: Tier;
  }
}
