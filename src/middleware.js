import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Token from cookies
  const token = request.cookies.get("token")?.value;

  // Protected routes start with /profile
  if (pathname.startsWith("/profile")) {
    if (!token) {
      // Redirect guest to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Token exists → allow access
    return NextResponse.next();
  }

  // All other routes are public → allow
  return NextResponse.next();
}

// Apply middleware only to /profile/*
export const config = {
  matcher: ["/profile/:path*"],
};
