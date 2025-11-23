import { NextResponse } from "next/server";

export function middleware(req) {
  const isAdmin = req.cookies.get("admin-auth")?.value === "true";

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
