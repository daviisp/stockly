import { NextRequest, NextResponse } from "next/server";
import getUrl from "./services/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("__Secure-authjs.session-token");
  const pathname = request.nextUrl.pathname;

  if ((token && pathname === "/auth") || pathname === "/") {
    return NextResponse.redirect(new URL(getUrl("/dashboard")));
  }

  const restrictedPaths = [
    "/",
    "/dashboard",
    "/products",
    "/sales",
    "/settings",
    "/profile",
  ];

  if (!token && restrictedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(getUrl("/auth")));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
