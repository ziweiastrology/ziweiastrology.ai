import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { locale } = await request.json();
  if (!["en", "zh"].includes(locale)) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
