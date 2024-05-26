
import Link from "next/link";
import { ContactForm } from "./contactForm";
import { CookieBanner } from "./cookieBanner";
import { ArrowLeft } from "lucide-react";
import { cookies } from 'next/headers'
import { COOKIES_ACCEPTED_COOKIE } from "@/lib/constants";

export default function Page() {
    const cookieStore = cookies()
    const hasCookie = cookieStore.has(COOKIES_ACCEPTED_COOKIE)
    return (
        <>
            <header className="py-8 container mx-auto">
                <h1 className="text-4xl font-bold">Contact</h1>
                <Link href="/" className="underline flex gap-3 w-fit hover:text-primary/95"><ArrowLeft/>Return Back home</Link>
            </header>
            <section className="container mx-auto">
                <ContactForm cookiesAccepted={hasCookie} />
            </section>
            <CookieBanner cookiesAccepted={hasCookie} />
        </>
    )
}