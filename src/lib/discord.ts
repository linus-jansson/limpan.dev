import { WebStream } from "openpgp";
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
    encryptedMessage: string;
}

export const getMessageTemplate = () => ({
    "username": "Portfoli contact receiver!",
    "avatar_url": "https://i.imgur.com/R66g1Pe.jpg",
    "embeds": [
        {
            "title": "You've got a new message!",
        }
    ]
})


export const sendDiscordWebhook = async (webhook_url: string, data: Record<string, any>): Promise<void> => {
    try {
        const formData = new FormData();
        const payload = getMessageTemplate();
        formData.append('payload_json', JSON.stringify(payload));
    
        data.files.forEach((file: File, index: number) => {
            formData.append(`file${index + 1}`, file);
        });
    
        const response = await fetch(webhook_url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to send webhook');
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
