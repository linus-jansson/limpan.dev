import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateVibrantColor(): string {
    // Define the minimum value for each color component to ensure vibrant colors
    const minColorValue = 100;
    const maxColorValue = 255;

    const red = getRandomInt(minColorValue, maxColorValue);
    const green = getRandomInt(minColorValue, maxColorValue);
    const blue = getRandomInt(minColorValue, maxColorValue);

    // Format the color as a decimal numeral
    const colorDecimal = (red << 16) + (green << 8) + blue;

    return colorDecimal.toString();
}

export async function getPublicPgpKey() {
    const PGP_PUBLIC_KEY_URL = "https://keys.openpgp.org/vks/v1/by-fingerprint/8E11C5D0245F00E1B307B9FF286227B6BDB9DF2C"
    const response = await fetch(PGP_PUBLIC_KEY_URL);
    return response.text();
}
