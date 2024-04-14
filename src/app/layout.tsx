import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

import { GeistSans } from 'geist/font/sans';
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
