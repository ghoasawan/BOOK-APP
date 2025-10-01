import React from "react";
import { BackgroundBeams } from "./components/ui/shadcn-io/background-beams";

export default function hello() {
  return (
      <div className=" mt-[80px] min-h-[cal(100vh-80[px])]) w-full flex flex-wrap gap-[50px] justify-center items-center z=-1">
        <div>
          <BackgroundBeams />
        </div>
      </div>
  
  );
}
