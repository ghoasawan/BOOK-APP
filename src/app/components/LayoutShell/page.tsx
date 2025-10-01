
"use client"

import React from "react";
import Header from "../header/header";

interface layoutInterface {
  children: React.ReactNode;
}
export default function LayoutShell({ children }: layoutInterface) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
