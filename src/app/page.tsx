"use client";

import React, { useState } from "react";
import { BackgroundBeams } from "./components/ui/shadcn-io/background-beams";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import SplitText from "./components/SplitText/SplitText";
import { useSession } from "next-auth/react";
import AlertDialog from "./components/Prompt/page";


export default function Hello() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [prompt, setPropmt] = useState(false);

  function handleOnclick() {
    if (session && status === "authenticated") router.push("/books");
    else {
      setPropmt((prev) => !prev);
    }
  }
  return (
    <div className=" mt-[80px] min-h-[cal(100vh-80[px])]) w-full flex flex-wrap gap-[50px] justify-center items-center  px-[200px]">
        <div className="flex justify-center items-center flex-col ">
          {
            (prompt)?(<><AlertDialog open={prompt} setOpen={setPropmt} /></>):""
          }
          <p className="text-white text-[65px] z-10 font-bold px-[80px] text-center  "></p>
          <SplitText
            text="ARE YOU LOOKING FOR BOOKS? BOOKSHELF GOT YOU COVERED"
            className="  text-white text-[65px] z-10 font-bold px-[80px] text-center "
            delay={50}
            duration={0.2}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.4}
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
          
        </div>
      <BackgroundBeams className="bg-black" />
    </div>
  );
}
