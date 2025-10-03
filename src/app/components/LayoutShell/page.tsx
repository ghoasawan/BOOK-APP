"use client"

import React from "react";
import Header from "../header/header";
import { usePathname } from "next/navigation";

interface layoutInterface {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: layoutInterface) {

  const noLayoutPath = ['/signup', '/login','/addBook']
  const pathname= usePathname();
  const isheaderVisible= noLayoutPath.includes(pathname);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      { !isheaderVisible && <Header/>}

      {/* Page content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
