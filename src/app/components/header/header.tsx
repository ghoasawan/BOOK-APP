"use client"

import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  return (
    <div className="h-[80px] px-[200px] w-full bg-black text-white z-10 ">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-6 flex justify-center items-start flex-col text-[30px] font-bold">
          BOOKSHELF
        </div>
        <div className="col-span-6 flex gap-[20px] items-center justify-end">
          <div className="bg-gray-300 h-[40px] rounded-2xl flex justify-center items-center gap-[10px] px-4 text-black hover:bg-purple-200">
            <CiSearch className="text-purple-900" size={20} />
            <input
              type="text"
              name="search"
              id="search"
              className="focus:outline-none bg-transparent"
              placeholder="Search...."
            />
          </div>
          <div className="h-[40px] bg-purple-900 w-[40px] rounded-full flex items-center justify-center text-[20px] cursor-pointer font-semibold">
            G
          </div>
        </div>
      </div>
    </div>
  );
}
