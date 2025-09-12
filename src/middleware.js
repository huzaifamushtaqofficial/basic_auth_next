import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // ✅ Always put "/" at start
  const isPublicPath =
    path === "/signup" || path === "/login" || path === "/" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/", "/login", "/signup", "/verifyemail"],
};
