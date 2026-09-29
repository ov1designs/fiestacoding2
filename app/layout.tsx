import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SignupProvider } from "@/components/signup-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fiesta Coding + AI",
  description:
    "Making technology education accessible, joyful, and culturally connected for every child in El Paso.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <SignupProvider>{children}</SignupProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
