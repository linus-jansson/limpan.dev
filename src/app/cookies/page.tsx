import Link from "next/link";
import { Cookie } from "lucide-react";
import { Cc } from "@/components/Cc";
import { Footer } from "@/components/footer";

export default function page() {
    return (
        <>
            <section className="flex flex-col p-4 space-y-4 container mx-auto mb-auto">
                <h1 className="text-3xl flex items-center gap-4">Cookies on this site <Cookie className="stroke-warning" size={32}/></h1>
                <p className="text-lg">So basically in the EU we have some sort of <a href="https://gdpr.eu/cookies/" className="text-info underline hover:text-info/75">law</a> where we need the user to accept cookies yada yada...</p>
                <p className="text-lg font-semibold">I will only send your interactional data to cloudflare for you to be able to submit the contact form on the page. Cloudflare will also save a couple of cookies in your browser. When you accept the cookies of course!</p>
                <p className="text-lg">Anyways, if you wanna head back click <Link href='/cnct' className="text-info underline hover:text-info/75">here!</Link></p>
            </section>
            <Footer/>
        </>
    )
}