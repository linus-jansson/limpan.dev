
"use server";
import { CAPTCHEA_FAILED, COOKIES_ACCEPTED_COOKIE, ERROR_SENDING_MESSAGE, INVALID_REQUEST, MESSAGE_SENT, NO_UNIQUE_IDENTIFIER, RATE_LIMIT, RATE_LIMIT_DURATION, RATE_LIMIT_EXCEEDED } from '@/lib/constants';

import { getMessageTemplate, sendDiscordWebhook } from '@/lib/discord';
import { getPgpPublicKey, verifyCloudflareTurnstile } from '@/lib/utils-server';
import { Ratelimit } from '@upstash/ratelimit';
import { cookies } from 'next/headers'
import { headers } from "next/headers";

import { Redis } from "@upstash/redis";
import { FORCE_RATE_LIMIT } from '@/lib/settings';
import { contactSchema } from '@/lib/contactSchema';
import { encryptMessage } from '@/lib/encryption';

const HOST_URL = process.env.HOST_URL!;
const DC_WEBHOOK = process.env.DISCORD_WEBHOOK_URL!;

type MessageResponse = {
    ok: boolean;
    message: string;
    code?: number;
}

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT, RATE_LIMIT_DURATION),
    analytics: true,
    prefix: "contact-form-ratelimit",
});


// Todo: make a type for the form data
// maybe create a lib with types to use to send webhooks :)

export async function submitContactForm(formData: Record<string, any>): Promise<MessageResponse> {
    // Get request IP
    const identifier = (headers().get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    if (!identifier) {
        return {
            ok: false,
            message: INVALID_REQUEST
        }
    }
    
    console.log("Post from", identifier);
    // Only rate limit in production
    if (process.env.NODE_ENV !== 'development' || FORCE_RATE_LIMIT) {
        const { success } = await ratelimit.limit(identifier);

        if (!success) {
        return {
            ok: false,
            message: RATE_LIMIT_EXCEEDED
        }
       }
    }

    const parsed_formdata = contactSchema.safeParse(formData);

    if (!parsed_formdata.success) {
        return {
            ok: false,
            message: INVALID_REQUEST
        }
    }

    const form_data = parsed_formdata.data;

    try {
        const isCaptcha = await verifyCloudflareTurnstile(form_data?.token);
        if (!isCaptcha) {
            return {
                ok: false,
                message: CAPTCHEA_FAILED
            };
        }
        const encryptedMessage = await encryptMessage(JSON.stringify(parsed_formdata.data), await getPgpPublicKey())
        const template = getMessageTemplate(encryptedMessage);

        await sendDiscordWebhook(DC_WEBHOOK, template);

        return {
            ok: true,
            message: MESSAGE_SENT
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: ERROR_SENDING_MESSAGE
        }
    }
}
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