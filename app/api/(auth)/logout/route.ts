import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  // Clear the auth_token cookie
  const cookie = serialize("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // Applies to the entire site
    maxAge: -1, // Expire the cookie immediately
  });

  // Create a response and set the cookie header
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.append("Set-Cookie", cookie);

  return response;
}
