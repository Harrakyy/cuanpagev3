import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (isAdminRoute && !isLogin && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLogin && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
