"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import ROUTES from "@/constants/routes";
import { User } from "next-auth";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface MobileNavigationProps {
  isAuthenticated: boolean;
  user?: User;
  handleSignOut: () => void;
}

const MobileNavigation = ({
  isAuthenticated,
  user,
  handleSignOut,
}: MobileNavigationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 flex items-center justify-center"
        >
          <Menu className="h-5 w-5 text-dark400_light900" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-r border-light-700 dark:border-dark-400 pt-10"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-7 h-7 flex-shrink-0">
                <Image
                  src="/images/logo.svg"
                  alt="DevFlow Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <p className="h2-bold font-space-grotesk text-foreground">
                Dev<span className="text-primary">Flow</span>
              </p>
            </Link>
            <ThemeToggle />
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3 mb-8 p-4 background-light800_dark300 rounded-xl">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-500 flex items-center justify-center text-white text-xl">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <span>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
                )}
              </div>
              <div>
                <p className="paragraph-semibold text-dark400_light900">
                  {user?.name || "User"}
                </p>
                <p className="small-regular text-dark400_light900 truncate max-w-[180px]">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          )}

          <div className="flex-grow overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col gap-6 mb-8">
                <NavLinks isMobileNav />
              </section>
            </SheetClose>
          </div>

          <div className="mt-auto border-t border-light-700 dark:border-dark-400 pt-4 space-y-3">
            {isAuthenticated ? (
              <>
                <SheetClose asChild>
                  <Link href="/profile">
                    <Button className="justify-start w-full text-left bg-transparent hover:bg-light-800 dark:hover:bg-dark-300 text-dark400_light900">
                      <span>Profile</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    onClick={handleSignOut}
                    className="justify-start w-full text-left bg-transparent hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500"
                  >
                    Log Out
                  </Button>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN} className="block w-full">
                    <Button className="w-full primary-gradient text-light-900">
                      Log In
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP} className="block w-full">
                    <Button className="w-full bg-transparent border border-light-700 dark:border-dark-400 text-dark400_light900 hover:bg-light-800 dark:hover:bg-dark-300">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
