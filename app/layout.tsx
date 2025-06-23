import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "TechEd Institute - Professional Training Courses | Software Development, Data Science, AI",
  description:
    "Transform your career with TechEd Institute's 11 professional training courses. Expert-led programs in Software Development, Data Science, AI, Cloud Computing, Cybersecurity, and more. 90% placement rate.",
  keywords:
    "software development courses, data science training, AI courses, cloud computing, cybersecurity training, digital marketing, professional training institute, online courses, career transformation",
  authors: [{ name: "TechEd Institute" }],
  creator: "TechEd Institute",
  publisher: "TechEd Institute",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techedinstitute.com",
    title: "TechEd Institute - Professional Training Courses",
    description:
      "Transform your career with industry-ready skills. 11 professional courses, expert instructors, 90% placement rate.",
    siteName: "TechEd Institute",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechEd Institute - Professional Training Courses",
    description:
      "Transform your career with industry-ready skills. 11 professional courses, expert instructors, 90% placement rate.",
    creator: "@techedinstitute",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "TechEd Institute",
  description: "Professional training institute offering 11 cutting-edge courses in technology and management",
  url: "https://techedinstitute.com",
  logo: "https://techedinstitute.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-91158-13846",
    contactType: "customer service",
    email: "dimplebrar13@gmail.com",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Tech Street",
    addressLocality: "Innovation City",
    addressRegion: "TC",
    postalCode: "12345",
    addressCountry: "IN",
  },
  sameAs: [
    "https://facebook.com/techedinstitute",
    "https://instagram.com/techedinstitute",
    "https://linkedin.com/company/techedinstitute",
    "https://twitter.com/techedinstitute",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="canonical" href="https://techedinstitute.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  )
}
