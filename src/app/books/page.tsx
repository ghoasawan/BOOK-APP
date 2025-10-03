"use client";

import React, { useEffect } from "react";
import Card from "../components/card/card";
import Pagination from "@mui/material/Pagination";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const books = Array.from({ length: 40 }, (_, i) => ({
  name: `Book Title ${i + 1}`,
  rating: (Math.random() * 5).toFixed(1), // random rating 0.0 - 5.0
  genre: ["Romance", "Thriller", "Mystery", "Fantasy", "Sci-Fi", "Non-Fiction"][
    Math.floor(Math.random() * 6)
  ],
  description:
    "This is a placeholder description for Book " +
    (i + 1) +
    ". Replace it with the actual summary or blurb of the book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  author: `Author ${i + 1}`,
  bookCover: `https://picsum.photos/200/300?random=${i + 1}`, // random placeholder images
}));

export default function Books() {

  const {data:session, status}=useSession();
  const router=useRouter();


  useEffect(()=>{

    if(!(session && status==="authenticated"))
      router.push('/');
  },[session])
  return (
    <>
      <div className="w-full flex justify-center items-center gap-[50px] flex-wrap  py-[100px] px-[100px] bg-black">
        {books.map((data, index) => {
          return (
            <div key={index}>
              <Card
                title={data.name}
                rating={data.rating}
                author={data.author}
                bookCover={data.bookCover}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end items-center px-[100px]">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </>
  );
}
