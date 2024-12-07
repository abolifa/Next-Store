import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await prisma.brand.findMany({
      include: {
        media: true,
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching records" },
      { status: 500 }
    );
  }
}

// create new record
export async function POST(req: Request) {
  const data = await req.json();
  try {
    const response = await prisma.brand.create({
      data: data,
    });
    return NextResponse.json("Record Created.", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating record" },
      { status: 500 }
    );
  }
}
