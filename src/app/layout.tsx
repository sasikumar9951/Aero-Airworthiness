import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aeroairworthiness.com"),
  title: {
    default: "Aero Airworthiness | Premium FAA Certification Support",
    template: "%s | Aero Airworthiness",
  },
  description: "Elite FAA DAR-F authority and certification support for advanced aerospace programs. 30+ years of aviation excellence in North Carolina.",
  keywords: ["FAA Certification", "DAR-F", "Aviation Regulatory Compliance", "Aerospace Engineering", "STC Approvals", "PMA Systems"],
  authors: [{ name: "Aero Airworthiness Certification LLC" }],
  creator: "Aero Airworthiness",
  publisher: "Aero Airworthiness",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Aero Airworthiness | Premium FAA Certification Support",
    description: "Elite FAA DAR-F authority and certification support for advanced aerospace programs.",
    url: "https://aeroairworthiness.com",
    siteName: "Aero Airworthiness",
    images: [
      {
        url: "/company-logo.png",
        width: 800,
        height: 600,
        alt: "Aero Airworthiness Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aero Airworthiness | FAA Certification Support",
    description: "Elite FAA DAR-F authority and certification support.",
    images: ["/company-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aeroairworthiness.com",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
