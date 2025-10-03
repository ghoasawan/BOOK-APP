"use client";

import React from "react";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("session", session);
  console.log("status", status);

  function handleSignup() {
    router.push("/signup");
  }

  function handleLogin()
  {
    router.push('/login')
  }
 async function handleLogout()
  {
    await signOut({redirect:false})
    router.push('/')
  }



  return (
    <div className="h-[80px] px-[200px] w-full bg-black text-white z-100 ">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-6 flex justify-center items-start flex-col text-[30px] font-bold">
          <Link href="/">BOOKSHELF</Link>
        </div>
        <div className="col-span-6 flex gap-[20px] items-center justify-end">
          {session && status === "authenticated" ? (
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
          ) : (
            ""
          )}
          {session && status === "authenticated" ? (
            <div onClick={handleLogout} className="h-[40px] bg-purple-900 w-[40px] rounded-full flex items-center justify-center text-[20px] cursor-pointer font-semibold">
              {(session?.user?.email)[0].toUpperCase()}
            </div>
          ) : (
            ""
          )}
          {!(session && status === "authenticated") ? (
            <>
              <Button
                variant="contained"
                onClick={handleSignup}
                className="!bg-purple-900"
              >
                Signup
              </Button>
              <Button
                variant="contained"
                onClick={handleLogin}
                className="!bg-purple-900"
              >
                Login
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
