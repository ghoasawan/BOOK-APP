import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "../../../lib/prisma";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please login to delete books" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
