"use client"
import { FormEvent, useCallback, useState } from "react"
import { acceptCookies } from "../api"

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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <div className="flex items-center justify-between container mx-auto">
                <p className="text-sm text-muted-foreground">
                    This page uses cookies to make the captcha work. <span className="font-bold">To continue, please accept the use of cookies.</span>
                </p>
                <form onSubmit={handleCookieFormSubmit}>
                    <button className="text-sm text-accent-foreground">
                        Accept
                    </button>
                </form>
            </div>
        </div>
    )
}