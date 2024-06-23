import "server-only";
import fs from "fs";

const PATH_TO_PUBLIC_KEY = 'src/app/pgp/limpan.pgp-key.asc.old'
const CF_SECRET = process.env.CF_SECRET!;

import { CF_VERIFY_URL, } from "@/lib/constants";
import { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";


export const getPgpPublicKey = async (): Promise<string> => {
    return new Promise((resolve, reject
    ) => {
        fs.readFile(PATH_TO_PUBLIC_KEY, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    
    })
}

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