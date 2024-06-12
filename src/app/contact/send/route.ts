
import { contactSchema } from "@/lib/contactSchema";
import { getMessageTemplate, sendDiscordWebhook } from "@/lib/discord";
import { generateVibrantColor } from "@/lib/utils";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters

import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile'
import { FORCE_RATE_LIMIT } from "@/lib/settings";
import { CF_VERIFY_URL, RATE_LIMIT, RATE_LIMIT_DURATION } from "@/lib/constants";
import { encryptMessage } from "@/lib/encryption";
import { getPgpPublicKey } from "@/lib/utils-server";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT, RATE_LIMIT_DURATION),
    analytics: true,
    prefix: "contact-form-ratelimit",
});

const CF_SECRET = process.env.CF_SECRET!;
const DC_WEBHOOK = process.env.DISCORD_WEBHOOK_URL!;

async function verifyCaptchea(cf_verification_token: string) {
    if (!cf_verification_token) {
        return new Response('No token provided', {
            status: 400,
            headers: {
                'content-type': 'text/plain'
            }
        })
    }

    const res = await fetch(CF_VERIFY_URL, {
        method: 'POST',
        body: `secret=${encodeURIComponent(CF_SECRET)}&response=${encodeURIComponent(cf_verification_token)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })

    const data = (await res.json()) as TurnstileServerValidationResponse
    console.log("Captchea verification", data)
    return new Response(JSON.stringify(data), {
        status: data.success ? 200 : 400,
        headers: {
            'content-type': 'application/json'
        }
    })
}


export async function POST(request: Request) {
    // Get request IP
    const { searchParams } = new URL(request.url)
    const identifier = searchParams.get('identifier')
    if (!identifier) {
        return new Response("No identifier provided", {
            status: 400,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
    
    console.log("Post from", identifier);
    // Only rate limit in production
    if (process.env.NODE_ENV !== 'development' || FORCE_RATE_LIMIT) {
        const { success } = await ratelimit.limit(identifier);

        if (!success) {
            return new Response("Rate limit exceeded", {
                status: 429,
                headers: {
                    "Content-Type": "text/plain",
                },
            });
        }
    }

    const request_body = await request.json()
    const parsed_body = contactSchema.safeParse(request_body);

    const isCaptcha = await verifyCaptchea(request_body?.token);

    if (!isCaptcha.ok) {
        console.log(isCaptcha.status, isCaptcha.statusText, isCaptcha.body)
        return isCaptcha;
    }

    try {
        if (!parsed_body.success) {
            return new Response(parsed_body.error.message, {
                status: 400,
                headers: {
                    "Content-Type": "text/plain",
                },
            });
        }
        const encryptedMessage = await encryptMessage(JSON.stringify(parsed_body.data), await getPgpPublicKey())
        const template = getMessageTemplate(encryptedMessage);

        await sendDiscordWebhook(DC_WEBHOOK, template);

        return new Response(null, {
            status: 201,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", {
            status: 500,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
}