"use client"
import { FormEvent, useCallback, useState } from "react"
import { acceptCookies } from "../server-actions"
import Link from "next/link"

export const CookieBanner = ({cookiesAccepted}: {cookiesAccepted: boolean}) => {
    const [show, setShow] = useState(!cookiesAccepted)

    const handleCookieFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        acceptCookies()
        .then(() => {
            setShow(false)
        })
    };

    if (cookiesAccepted || !show)
        return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-8 border-t bg-base-100 border-border">
            <div className="flex items-center justify-between container mx-auto flex flex-wrap space-y-4 md:space-y-0">
                <div className="flex gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="text-sm text-muted-foreground">
                        This page uses cookies to make the captcha work. 
                    </p>
                    <span className="font-bold">To continue, please accept the use of cookies.</span>
                </div>
                <form onSubmit={handleCookieFormSubmit} className="flex gap-4">
                    <button className="btn">Accept</button>
                    <Link href="/" className="btn">Do not accept</Link>
                </form>
            </div>
        </div>
    )
}