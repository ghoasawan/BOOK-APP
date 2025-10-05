import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const searchQuery = searchParams.get("search") || "";

    const skip = (page - 1) * limit;
    const whereClause = searchQuery
      ? {
          title: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        }
      : {};

    const books = await prisma.book.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalBooks = await prisma.book.count();
    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json(
      {
        page,
        limit,
        totalPages,
        totalBooks,
        data: books,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error while fetching books:", error);
    return NextResponse.json(
      { error: "Server error fetching books" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized User, Please login to add books" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const genre = formData.get("genre") as string;
    const rating = formData.get("rating") as string;
    const pages = formData.get("pages") as string;
    const description = formData.get("description") as string;
    const coverPhoto = formData.get("coverPhoto") as File | null;

    if (!title || !author || !genre) {
      return NextResponse.json(
        { error: "Title, author, and genre are required" },
        { status: 400 }
      );
    }

    if (rating && (+rating < 0 || +rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 0 and 5" },
        { status: 400 }
      );
    }

    if (pages && +pages < 1) {
      return NextResponse.json(
        { error: "Pages must be at least 1" },
        { status: 400 }
      );
    }

    let coverPhotoUrl: string | null = null;
    if (coverPhoto) {
      const bytes = await coverPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      coverPhotoUrl = buffer.toString("base64");
    }

    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        rating: rating ? parseFloat(rating) : null,
        pages: pages ? parseInt(pages) : null,
        description: description?.trim() || null,
        coverPhoto: coverPhotoUrl,
      },
    });

    return NextResponse.json(
      { message: "Book added successfully", book },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
