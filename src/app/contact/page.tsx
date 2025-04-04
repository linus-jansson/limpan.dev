
import Link from "next/link";
import { ContactForm } from "./contactForm";
import { CookieBanner } from "./cookieBanner";
import { ArrowLeft } from "lucide-react";
import { cookies } from 'next/headers'
import { COOKIES_ACCEPTED_COOKIE } from "@/lib/constants";

export default async function Page() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has(COOKIES_ACCEPTED_COOKIE)
  return (
    <>
      <header className="py-8 container mx-auto px-8 md:px-0 space-y-4">
        <h1 className="text-4xl font-bold">Just another contact form <span aria-hidden={true}>{':)'}</span></h1>
        <Link href="/" className="underline flex gap-3 w-fit text-primary hover:text-primary/75"><ArrowLeft />Return Back home</Link>
      </header>
      <section className="container mx-auto px-8 md:px-0">
        <ContactForm cookiesAccepted={hasCookie} />
      </section>
      <CookieBanner cookiesAccepted={hasCookie} />
    </>
  )
}