"use client";

import React, { ReactNode } from "react";
import { signOut } from "next-auth/react";
import Navbar from "@/components/navigation/navbar/page";
import Sidebar from "@/components/navigation/Sidebar";
import ROUTES from "@/constants/routes";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.SIGN_IN });
  };

  return (
    <main className="flex min-h-screen">
      <Sidebar handleSignOut={handleSignOut} />
      <div className="flex-1">
        <Navbar />
        <div className="lg:ml-[240px]">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
