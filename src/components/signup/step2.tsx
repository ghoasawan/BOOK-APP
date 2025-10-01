import React from "react";
import { BackgroundBeams } from "../ui/shadcn-io/background-beams";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function step2() {


  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <div className="w-[500px]  flex justify-center items-center flex-col z-10 gap-[20px] ">
        <FaLock className="text-[50px] text-gray-600" />
        <p className="text-[30px] font-semibold text-gray-600">Signup</p>
        <form className="p-8 rounded-2xl  w-full  space-y-4 ">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"

            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"

            required
          />
         
          <Button variant="contained" className="w-full !bg-purple-800 !mb-[10px]">
            SignUp
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
