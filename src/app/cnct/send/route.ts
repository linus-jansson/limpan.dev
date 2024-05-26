
import { contactSchema } from "@/lib/contactSchema";
import { getMessageTemplate, sendDiscordWebhook } from "@/lib/discord";
import { generateVibrantColor } from "@/lib/utils";

const DcWebhook = process.env.DISCORD_WEBHOOK_URL!;


import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile'

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = process.env.CF_SECRET!;

async function verifyCaptchea(token: string) {
    if (!token) {
        return new Response('No token provided', {
            status: 400,
            headers: {
                'content-type': 'text/plain'
            }
        })
    }

  const res = await fetch(verifyEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
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

        const template = getMessageTemplate({
            name: parsed_body.data?.name,
            subject: parsed_body.data?.subject,
            email: parsed_body.data?.email,
            message: parsed_body.data.message,
            color: parsed_body.data?.color
        });

        await sendDiscordWebhook(DcWebhook, template);

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