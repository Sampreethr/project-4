import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/navigation/navbar'

const RootLayout = ({children}:{children:ReactNode}) => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  return (
    <main>
      {!isAuthPage && <Navbar />}
      {children}
    </main>
  )
}

export default RootLayout