"use client";
import { ThemeProviderProps } from 'next-themes'
import React from 'react'
import { ThemeProvider as NextThemesprovider } from "next-themes";
const ThemeProvider = ({children, ...props}: ThemeProviderProps) => {
  return (
    <NextThemesprovider {...props}>{children}</NextThemesprovider>
  )
}

export default ThemeProvider