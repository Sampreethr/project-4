'use client'

import React from 'react'
import Link from 'next/link'
import {
    Sheet,
    SheetContent,
    
    
    
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image';

const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image 
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/logo.svg"
              width={23}
              height={23}
              alt="Logo"
            />
            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Flow</span>
            </p>
          </Link>

          <nav className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-dark100_light900 hover:text-primary-500">
              <Image src="/icons/home.svg" width={20} height={20} alt="Home" className="invert-colors" />
              <span>Home</span>
            </Link>
            <Link href="/questions" className="flex items-center gap-2 text-dark100_light900 hover:text-primary-500">
              <Image src="/icons/questions.svg" width={20} height={20} alt="Questions" className="invert-colors" />
              <span>Questions</span>
            </Link>
            <Link href="/tags" className="flex items-center gap-2 text-dark100_light900 hover:text-primary-500">
              <Image src="/icons/tag.svg" width={20} height={20} alt="Tags" className="invert-colors" />
              <span>Tags</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-2 text-dark100_light900 hover:text-primary-500">
              <Image src="/icons/user.svg" width={20} height={20} alt="Profile" className="invert-colors" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation