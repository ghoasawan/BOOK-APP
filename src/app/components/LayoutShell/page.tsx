"use client"

import React from "react";
import Header from "../header/header";

interface layoutInterface {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: layoutInterface) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Header />

      {/* Page content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
