"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Home,
  MessageSquare,
  Users,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ROUTES from "@/constants/routes";

// Define navigation links
const navLinks = [
  {
    icon: <Home className="h-5 w-5" />,
    route: "/",
    label: "Home",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    route: "/questions",
    label: "Questions",
  },
  {
    icon: <Users className="h-5 w-5" />,
    route: "/community",
    label: "Community",
  },
  {
    icon: <HelpCircle className="h-5 w-5" />,
    route: "/ask-question",
    label: "Ask Question",
  },
];

interface SidebarProps {
  handleSignOut: () => void;
}

const Sidebar = ({ handleSignOut }: SidebarProps) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <aside className="hidden lg:flex flex-col w-[240px] h-screen bg-card border-r border-border fixed left-0 top-0 py-6 px-3">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-3 mb-8">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src="/images/logo.svg"
            alt="DevFlow Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <p className="font-bold text-xl text-foreground font-space-grotesk">
          Dev<span className="text-primary">Flow</span>
        </p>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-2 mb-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              key={link.route}
              href={link.route}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-border my-4"></div>

      {/* User section */}
      {isAuthenticated ? (
        <div className="mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-foreground truncate">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-2">
            <Link href="/profile">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:bg-destructive/10 border-destructive/20"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-auto px-2 space-y-2">
          <Link href={ROUTES.SIGN_IN} className="block w-full">
            <Button variant="outline" className="w-full" size="sm">
              Log In
            </Button>
          </Link>
          <Link href={ROUTES.SIGN_UP} className="block w-full">
            <Button
              className="w-full bg-primary text-primary-foreground"
              size="sm"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}

      {/* Theme Toggle */}
      <div className="mt-4 flex justify-center">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
