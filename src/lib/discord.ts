import { generateVibrantColor } from "./utils";

type DiscordWebhookStructure = {
    content?: string;
    username?: string;
    avatar_url?: string;
    embeds?: {
        title?: string;
        description?: string;
        color?: string;
        fields?: {
            name?: string;
            value?: string;
            inline?: boolean;
        }[];
    }[];
};

type WebookReturn = Promise<void | Error>

const generateWebhookJson = ({
    content,
    username,
    avatar_url,
    embeds,
}: DiscordWebhookStructure) => {
    return JSON.stringify({
        content,
        username,
        avatar_url,
        embeds,
    });
};

type MessageTemplate = {
    name?: string;
    subject?: string;
    email?: string;
    message: string;
    color?: string;
}

export const getMessageTemplate = ({name, subject, email, message, color}: MessageTemplate) => ({
    "username": "Portfoli contact receiver!",
    "avatar_url": "https://i.imgur.com/R66g1Pe.jpg",
    "embeds": [
        {
            "author": {
                "name": `${name ?? 'Anonymous'} (${email ?? 'No email provided'}) has sent you a message!`,
            },
            "title": subject ?? 'No subject provided',
            "description": message,
            "color": parseInt(color ?? generateVibrantColor()),
            "footer": {
                "text": `You have gotten a new message on your portfolio!`,
                "icon_url": "https://i.imgur.com/R66g1Pe.jpg"
            }
        }
    ]
})


export const sendDiscordWebhook = async (webhook_url: string, data: Record<string, any>) : Promise<void> => {
    const res = await fetch(webhook_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        return Promise.reject(new Error('Failed to send webhook'));
    }

    return Promise.resolve();
}