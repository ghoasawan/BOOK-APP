"use client";
import React from "react";
import { BackgroundBeams } from "./components/ui/shadcn-io/background-beams";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import SplitText from "./components/SplitText/SplitText";

export default function Hello() {
  const router = useRouter();

  function handleOnclick() {
    router.push("/books");
  }
  return (
    <div className=" mt-[80px] min-h-[cal(100vh-80[px])]) w-full flex flex-wrap gap-[50px] justify-center items-center  px-[200px]">
      <div className="flex justify-center items-center flex-col ">
        <p className="text-white text-[65px] z-10 font-bold px-[80px] text-center  "></p>
        <SplitText
          text="ARE YOU LOOKING FOR BOOKS? BOOKSHELF GOT YOU COVERED"
          className="  text-white text-[65px] z-10 font-bold px-[80px] text-center "
          delay={40}
          duration={0.2}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <Button
          variant="contained"
          size="large"
          className=" !bg-purple-900 w-[20%] z-10 !mt-[40px]"
          onClick={handleOnclick}
        >
          View Books
        </Button>
        <BackgroundBeams className="bg-black" />
      </div>
    </div>
  );
}
