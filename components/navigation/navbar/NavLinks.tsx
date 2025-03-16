"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MessageSquare, HelpCircle } from "lucide-react";

interface NavLinkProps {
  isMobileNav?: boolean;
}

type NavLink = {
  icon: React.ReactNode;
  route: string;
  label: string;
};

const navLinks: NavLink[] = [
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

const NavLinks = ({ isMobileNav = false }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex ${
        isMobileNav ? "flex-col w-full space-y-1" : "max-md:hidden gap-4"
      }`}
    >
      {navLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.route}
            href={link.route}
            className={`flex items-center gap-3 rounded-lg transition-colors ${
              isMobileNav ? "p-3" : "p-2"
            } ${
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <div>{link.icon}</div>
            <span
              className={`${
                isMobileNav ? "text-sm font-medium" : "hidden lg:block text-sm"
              }`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
