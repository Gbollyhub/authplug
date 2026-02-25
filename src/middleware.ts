import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protect all /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const adminToken = req.cookies.get("adminToken")?.value;

    if (!adminToken) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // redirect logged-in admins away from login/register pages
  if (pathname === "/admin/login" || pathname === "/admin/register") {
    const adminToken = req.cookies.get("adminToken")?.value;

    if (adminToken) {
      const dashboardUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/login", "/admin/register"],
};
