import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Limpan | Software Developer Portfolio',
  description: 'Get to know Limpan, a software developer from Sweden. Check what what I’m currently working on!',
  openGraph: {
      type: 'website',
      title: 'Limpan - Software Developer | Sweden',
      description: 'Get to know Limpan, a software developer from Sweden. Check what what I’m currently working on!',
      url: 'https://limpan.dev/',
      images: 'https://limpan.dev/bg.png',
  },
  other: {
      'theme-color': '#18181B',
      'apple-mobile-web-app-capable': 'true',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, "antialiased scroll-smooth bg-gray-950 text-white flex flex-col")}
      >
        {children}
        <Footer/>
      </body>
      <Analytics/>
    </html>
  );
}
