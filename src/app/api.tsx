
"use server";
import { COOKIES_ACCEPTED_COOKIE } from '@/lib/constants';
import { cookies } from 'next/headers'


const HOST_URL = process.env.HOST_URL!;

// Todo: make a type for the form data
// maybe create a lib with types to use to send webhooks :)
export async function sendMessage(formData: Record<string, any>): Promise<string> {
    "use server";
    console.log(formData)
    const response = await fetch(HOST_URL + '/cnct/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    // check if rate limited 
    if (response.status === 429) {
        return Promise.reject(new Error('Seems like you are sending too many messages, try again later'));
    }
    else if (!response.ok) {
        // anything else erroring
        return Promise.reject(new Error('Failed to send message'));
    }
    else {
        return Promise.resolve("Message sent!");
    }
}

export async function acceptCookies() {
    "use server"
    cookies().set(COOKIES_ACCEPTED_COOKIE, "true")
    return Promise.resolve("Cookies accepted!");
}