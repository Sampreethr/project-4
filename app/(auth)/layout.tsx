
import React, { ReactNode } from 'react'
import Image from 'next/image'
import SocialAuthForm from '@/components/forms/SocialAuthForm'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[url('/images/geometric-pattern.svg')] bg-fixed bg-cover bg-center bg-no-repeat px-4 py-10 relative before:absolute before:inset-0 before:bg-black/30">
        <section className="light-border background-light800_dark200 shadow-light100_dark100 relative z-10 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-2">
                <div className="space-y-2.5">
                    <h1 className="h2-bold text-dark100_light900">
                        Join DevFlow
                    </h1>
                    <p className="paragraph-regular text-dark500_light100">
                        To get your questions answered
                    </p>
                </div>
                <Image 
                  src="/images/logo.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
            </div>
            {children}
            <SocialAuthForm/>
        </section>
    </main>
  )
}

export default AuthLayout