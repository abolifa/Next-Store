import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import `cookies` from `next/headers`
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    // Use `await cookies()` to get the cookie value
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // If no token, return unauthorized
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify the token
    let decoded;
    try {
      decoded = verify(token, JWT_SECRET) as { userId: string; email: string };
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    // Fetch user info from the database using the user ID from the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user information
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
