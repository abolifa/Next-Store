import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const response = await prisma.brand.findUnique({
      where: {
        id: id,
      },
      include: {
        media: true,
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching record" },
      { status: 500 }
    );
  }
}

// update record
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await req.json();
  try {
    const response = await prisma.brand.update({
      where: {
        id: id,
      },
      data: data,
    });
    return NextResponse.json("Record Updated.", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating record" },
      { status: 500 }
    );
  }
}

// delete record
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const response = await prisma.brand.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json("Record Deleted.", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting record" },
      { status: 500 }
    );
  }
}
