
"use server";
import { COOKIES_ACCEPTED_COOKIE, ERROR_SENDING_MESSAGE, MESSAGE_SENT, RATE_LIMIT_EXCEEDED } from '@/lib/constants';
import { cookies } from 'next/headers'
import { headers } from "next/headers";


const HOST_URL = process.env.HOST_URL!;

type MessageResponse = {
    ok: boolean;
    message: string;
    code?: number;
}

// Todo: make a type for the form data
// maybe create a lib with types to use to send webhooks :)
export async function sendMessage(formData: Record<string, any>): Promise<MessageResponse> {
    "use server";
    // console.log(formData)
    const identifier = (headers().get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    const response = await fetch(HOST_URL + `/contact/send?identifier=${identifier}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    // check if rate limited 
    if (!response.ok) {
        return {
            ok: false,
            message: response.status === 429 ? RATE_LIMIT_EXCEEDED : ERROR_SENDING_MESSAGE,
        };
    }

    return {
        ok: true,
        message: MESSAGE_SENT,
    };
}

export async function acceptCookies() {
    "use server"
    cookies().set(COOKIES_ACCEPTED_COOKIE, "true", { maxAge: 60 * 60 * 24, /* 1 day */ })
    return Promise.resolve("Cookies accepted!");
}