import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import fs from "fs";
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

export function pgpUpperBoundEstimation(keyLength: number, plaintextLength: number, overhead: number = 100): number {
    const p = plaintextLength / 4;
    return keyLength + Math.ceil(p * 4) + overhead;
}

export function encryptMessage = (message: string, publicKey: string): string => {
