'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import MobileNavigation from './MobileNavigation'

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="flex-1 px-4 max-w-[600px] mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search globally..."
              className="background-light800_darkgradient w-full pl-10 text-dark100_light900"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <MobileNavigation/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar