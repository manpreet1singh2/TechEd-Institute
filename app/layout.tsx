import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CourseDetailsModal from "@/components/course-details-modal"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechMindsHub - Professional Training Institute",
  description:
    "Your gateway to industry-ready skills in technology and management. 11 cutting-edge courses designed for real-world success.",
  keywords: "programming, software development, data science, AI, machine learning, courses, training, education",
  authors: [{ name: "TechMindsHub" }],
  openGraph: {
    title: "TechMindsHub - Professional Training Institute",
    description: "Transform your career with industry-focused courses in technology and management",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <CourseDetailsModal />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
