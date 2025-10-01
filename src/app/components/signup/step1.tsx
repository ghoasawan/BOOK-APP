"use client";

import React from "react";
import { BackgroundBeams } from "../ui/shadcn-io/background-beams";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";
import Badge from "@mui/material/Badge";

export default function step1() {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="w-[500px]  flex justify-center items-center flex-col z-10 gap-[20px] ">
        <FaLock className="text-[50px] text-gray-600" />
        <p className="text-[30px] font-semibold text-gray-600">Signup</p>
        <form className="p-8 rounded-2xl  w-full  space-y-4 flex flex-col justify-center items-center">
          <Badge color="secondary" overlap="circular" badgeContent=" +" className="cursor-pointer">
            <div className="w-[150px] h-[150px] border-1 border-dashed rounded-full border-gray-500"></div>
            <input type="file" name="profilePic" id="profilePic" className="hidden"/>
          </Badge>

          <Button
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px]"
          >
            Next
          </Button>
          <Button
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px]"
          >
            Skip
          </Button>
          <div className="flex justify-center">
            <span className="text-[13px] text-gray-600">
              Already have an Account?{" "}
              <Link
                href="/login"
                className="text-[14px] hover:underline text-purple-900"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
