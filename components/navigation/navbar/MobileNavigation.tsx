"use client";

// Enhanced mobile navigation with improved accessibility and styling
import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import ROUTES from "@/constants/routes";
import { User } from "next-auth";
import { LogOut, Menu, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <Menu className="h-5 w-5 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background border-r border-border p-0 w-[280px]"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header with Logo and Theme Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                width={28}
                height={28}
                alt="DevFlow Logo"
              />
              <p className="font-bold text-xl text-foreground font-space-grotesk">
                Dev<span className="text-primary">Flow</span>
              </p>
            </Link>
            <ThemeToggle />
          </div>

          {/* User Profile Section - Only if authenticated */}
          {isAuthenticated && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {user?.email || ""}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <SheetClose asChild>
              <section className="mb-6">
                <NavLinks isMobileNav />
              </section>
            </SheetClose>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto border-t border-border p-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <SheetClose asChild>
                  <Link href="/profile" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 border-destructive/20"
                    size="sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <div className="space-y-2">
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN} className="block w-full">
                    <Button variant="outline" className="w-full" size="sm">
                      Log In
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP} className="block w-full">
                    <Button
                      className="w-full bg-primary text-primary-foreground"
                      size="sm"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
