import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "../../../lib/prisma";

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,DELETE,OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return withCors(NextResponse.json(
        { error: "Unauthorized - Please login to delete books" },
        { status: 401 }
      ));
    }

    const { id } = await params;

    if (!id) {
      return withCors(NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      ));
    }

    const ID= Number(id);
    const existingBook = await prisma.book.findUnique({
      where: { id:ID },
    });

    if (!existingBook) {
      return withCors(NextResponse.json({ error: "Book not found" }, { status: 404 }));
    }

    
    await prisma.book.delete({
      where: { id:ID },
    });

    return withCors(NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    ));
  } catch (error) {
    console.error("Error deleting book:", error);
    return withCors(NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    ));
  }
}



export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return withCors(NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      ));
    }

    const { id } = await params;

    if (!id) {
      return withCors(NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      ));
    }

    const ID = Number(id);
    const existingBook = await prisma.book.findUnique({
      where: { id:ID },
    });

    if (!existingBook) {
      return withCors(NextResponse.json({ error: "Book not Found" }, { status: 404 }));
    } else {
      return withCors(NextResponse.json(
        { message: "Book Found", data: existingBook },
        { status: 200 }
      ));
    }
  } catch (error) {
    console.error("server error", error);
    return withCors(NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    ));
  }
}
