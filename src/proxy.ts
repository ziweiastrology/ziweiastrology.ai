import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Routes that require at least BASIC tier (read access)
const BASIC_ROUTES = [
  "/community/feed",
  "/community/pillar-data",
  "/community/analysis",
  "/community/groups",
];

// Routes that require PREMIUM tier (write access + academy)
const PREMIUM_ROUTES = ["/academy/dashboard", "/academy/courses"];

// Routes that require authentication (any tier)
const AUTH_ROUTES = [...BASIC_ROUTES, ...PREMIUM_ROUTES];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const tier = (req.auth?.user as Record<string, unknown>)?.tier as string || "FREE";

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith("/auth/") && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check if route requires auth
  const needsAuth = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (needsAuth && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check tier-based access
  if (isLoggedIn) {
    const needsBasic = BASIC_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    const needsPremium = PREMIUM_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (needsPremium && !["PREMIUM", "SIFU"].includes(tier)) {
      return NextResponse.redirect(new URL("/community?upgrade=premium", req.url));
    }

    if (needsBasic && tier === "FREE") {
      return NextResponse.redirect(new URL("/community?upgrade=basic", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
