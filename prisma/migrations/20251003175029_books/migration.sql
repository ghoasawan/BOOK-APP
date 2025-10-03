-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "coverPhoto" TEXT,
    "author" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "genre" TEXT NOT NULL,
    "description" TEXT,
    "pages" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
