import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { profile } from "@/content/profile";
import { navItems } from "@/content/site";
import { hasContactChannels } from "@/lib/contact";
import { Navbar } from "@/components/Navbar";
import { SkipLink } from "@/components/ui/SkipLink";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.seo.canonical),
  title: profile.seo.title,
  description: profile.seo.description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.publicName }],
  openGraph: {
    type: "website",
    url: profile.seo.canonical,
    siteName: profile.publicName,
    title: profile.seo.title,
    description: profile.seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: profile.seo.title,
    description: profile.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.publicName,
  alternateName: [profile.legalNameNative],
  email: profile.contact.email,
  jobTitle: profile.role,
  url: profile.seo.canonical,
  affiliation: { "@type": "CollegeOrUniversity", name: "City University of Hong Kong" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Shenzhen University" },
  knowsAbout: profile.interests,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} ${inter.variable} ${geistMono.variable} antialiased`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <SkipLink />
          <Navbar
            brand={profile.publicName}
            items={navItems.filter((n) => n.id !== "contact" || hasContactChannels(profile.contact))}
          />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
