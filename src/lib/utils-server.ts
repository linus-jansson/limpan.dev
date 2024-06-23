import "server-only";

const CF_SECRET = process.env.CF_SECRET!;

import { CF_VERIFY_URL, } from "@/lib/constants";
import { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";


export const verifyCloudflareTurnstile = async (cf_verification_token : string) => {
    if (!cf_verification_token) {
        return false
    }

    const res = await fetch(CF_VERIFY_URL, {
        method: 'POST',
        body: `secret=${encodeURIComponent(CF_SECRET)}&response=${encodeURIComponent(cf_verification_token)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })

    try {
        const data = (await res.json()) as TurnstileServerValidationResponse
        return data.success;
    } catch (error) {
        console.error("Captchea verification failed with error:", error);
        return false;        
    }
}