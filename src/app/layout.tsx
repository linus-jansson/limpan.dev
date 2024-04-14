import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Footer } from "@/components/footer";
import { Hamburger, HamburgerBody, HamburgerFooter, PopoutMenu } from "@/components/header";
import { Email, Github } from "@/components/icons";
import { FileLock2, Lock } from "lucide-react";
export const metadata: Metadata = {
    title: '...',
    description: '...',
    openGraph: {
        type: 'website',
        title: '...',
        description: '...',
        url: 'https://limpan.dev/',
        images: '...',
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
        <html lang="en" data-theme="forest">
            <body className={cn(GeistSans.className, 'h-screen')}>
                {children}
            </body>
        </html>
    );
}
