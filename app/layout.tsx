import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

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
    description: 'A software developer from Sweden. Check what I’m currently working on!',
    openGraph: {
        type: 'website',
        title: 'Limpan - Software Developer | Sweden',
        description: 'A software developer from Sweden. Check what I’m currently working on!',
        url: 'https://limpan.dev/',
        // images: 'https://limpan.dev/bg.png',
    },
    other: {
        'theme-color': '#18181B',
        'apple-mobile-web-app-capable': 'true',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
    }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <Analytics/>
    </html>
  );
}
