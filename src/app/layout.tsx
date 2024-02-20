import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: 'Hey! I\'m Linus!',
    description: 'Software developer from Sweden. Here is my site!',
    openGraph: {
        type: 'website',
        title: 'Hey! I\'m Linus!',
        description: 'Software developer from Sweden. Here is my site!',
        url: 'https://limpan.dev/',
        images: 'https://limpan.dev/images/background.jpg',
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
      <body className={cn(GeistMono.className, )}>{children}</body>
    </html>
  );
}
