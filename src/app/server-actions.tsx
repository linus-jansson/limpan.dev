
"use server";
import { CAPTCHEA_FAILED, COOKIES_ACCEPTED_COOKIE, ERROR_SENDING_MESSAGE, INVALID_REQUEST, MESSAGE_SENT, MESSAGE_TOO_LARGE, NO_UNIQUE_IDENTIFIER, RATE_LIMIT, RATE_LIMIT_DURATION, RATE_LIMIT_EXCEEDED } from '@/lib/constants';

import { getMessageTemplate, sendDiscordWebhook } from '@/lib/discord';
import { verifyCloudflareTurnstile } from '@/lib/utils-server';
import { Ratelimit } from '@upstash/ratelimit';
import { cookies } from 'next/headers'
import { headers } from "next/headers";

import { Redis } from "@upstash/redis";
import { FORCE_RATE_LIMIT } from '@/lib/settings';
import { contactSchema } from '@/lib/contactSchema';
import { encryptMessage } from '@/lib/encryption';
import { getPublicPgpKey } from '@/lib/utils';

const HOST_URL = process.env.HOST_URL!;
const DC_WEBHOOK = process.env.DISCORD_WEBHOOK_URL!;
const DISCORD_FILE_LIMIT = 8 * 1024 * 1024;

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
    const messageToEncrypt = JSON.stringify({
      name: form_data.name,
      email: form_data.email,
      subject: form_data.subject,
      message: form_data.message,
      identifier: identifier,
    }, null, 2);
    const PUBLIC_KEY = await getPublicPgpKey();

    // https://discord.com/developers/docs/resources/webhook#webhook-resource
    const template = getMessageTemplate();
    const encryptedMessage = await encryptMessage(messageToEncrypt, PUBLIC_KEY);
    const buffer = Buffer.from(encryptedMessage, 'utf-8');
    const file = new File([buffer], "message.asc", { type: 'application/pgp-encrypted' });

    Object.assign(template, { files: [file] });

    if (file.size >= DISCORD_FILE_LIMIT - 1) {
      return {
        ok: false,
        message: MESSAGE_TOO_LARGE
      }
    }

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

export async function acceptCookies() {
  "use server"
  const cookieStore = await cookies();
  cookieStore.set(COOKIES_ACCEPTED_COOKIE, "true", { maxAge: 60 * 60 * 24, /* 1 day */ })
  return Promise.resolve("Cookies accepted!");
}