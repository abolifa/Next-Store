import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes to exclude from middleware
const excludedRoutes = [
  "/login",
  "/api/auth/login",
  "/signup",
  "/api/auth/signup",
];

export function middleware(req: NextRequest) {
  // Check if the request URL is in the excluded routes
  const { pathname } = req.nextUrl;
  if (excludedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next(); // Allow the request
  }

  // Check for the auth token in cookies
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    // If no token, redirect to login page
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except the excluded ones
     * This automatically applies middleware to all routes except those in `excludedRoutes`
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
