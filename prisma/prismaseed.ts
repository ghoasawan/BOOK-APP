import { prisma } from "../src/app/lib/prisma"


async function main() {

  const books = Array.from({ length: 40 }, (_, i) => ({
    title: `Book Title ${i + 1}`,
    rating: parseFloat((Math.random() * 5).toFixed(1)), // convert string to float
    genre: ["Romance", "Thriller", "Mystery", "Fantasy", "Sci-Fi", "Non-Fiction"][
      Math.floor(Math.random() * 6)
    ],
    description:
      "This is a placeholder description for Book " +
      (i + 1) +
      ". Replace it with the actual summary or blurb of the book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: `Author ${i + 1}`,
    coverPhoto: `https://picsum.photos/200/300?random=${i + 1}`, // random placeholder images
    pages: Math.floor(Math.random() * 500) + 100, // random page count between 100–600
  }));

  // Seed books
  await prisma.book.createMany({
    data:books
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });