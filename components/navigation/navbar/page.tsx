"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import { useSession, signOut } from "next-auth/react";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.SIGN_IN });
  };

  return (
    <nav className="bg-background fixed z-50 w-full p-4 shadow-sm border-b border-border sm:px-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo - Show on all screen sizes */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/logo.svg"
            width={28}
            height={28}
            alt="DevFlow Logo"
            className="min-w-7 min-h-7"
          />
          <p className="h2-bold font-space-grotesk text-foreground max-sm:hidden">
            Dev<span className="text-primary">Flow</span>
          </p>
        </Link>

        <div className="flex-1 px-4 max-w-[600px] mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search globally..."
              className="bg-muted w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle only visible on small to medium screens, hidden on large screens (where sidebar shows it) */}
          <div className="lg:hidden">
            <ThemeToggle />
          </div>

          {/* Desktop Authentication Buttons - Only visible on medium screens, hidden on small (mobile nav) and large screens (sidebar) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition">
                    <Avatar className="h-9 w-9 cursor-pointer border border-border">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="pr-1">
                      <svg
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.97168 0.5C0.57411 0.5 0.377151 0.97411 0.659349 1.25631L5.68767 6.28463C5.85459 6.45154 6.12504 6.45154 6.29195 6.28463L11.3203 1.25631C11.6025 0.97411 11.4055 0.5 11.0079 0.5H0.97168Z"
                          fill="currentColor"
                          className="text-muted-foreground"
                        />
                      </svg>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-popover border border-border p-2 shadow-md rounded-lg min-w-[200px] mt-2"
                >
                  <DropdownMenuLabel className="text-foreground p-2 text-sm font-medium">
                    {session?.user?.name || "User"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border my-1" />
                  <Link href="/profile">
                    <DropdownMenuItem className="text-foreground cursor-pointer hover:bg-muted p-2 text-sm transition-colors rounded-lg">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive cursor-pointer hover:bg-destructive/10 p-2 text-sm transition-colors rounded-lg"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    variant="ghost"
                    className="text-foreground hover:bg-muted rounded-lg h-10"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href={ROUTES.SIGN_UP}>
                  <Button className="bg-primary text-primary-foreground rounded-lg h-10">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button - Only visible on small screens */}
          <div className="md:hidden">
            <MobileNavigation
              isAuthenticated={isAuthenticated}
              user={session?.user}
              handleSignOut={handleSignOut}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
