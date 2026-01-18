/**
 * Computes the relative luminance of a color.
 * Formula: 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export function getLuminance(hex: string): number {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates the contrast ratio between two colors.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Converts hex to RGB.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * Generates a complementary color.
 */
export function getComplementaryColor(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";

    const r = (255 - rgb.r).toString(16).padStart(2, "0");
    const g = (255 - rgb.g).toString(16).padStart(2, "0");
    const b = (255 - rgb.b).toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}

/**
 * Simulates accessible adjustment (brute force light/dark shift).
 */
export function ensureContrast(color: string, background: string, targetRatio = 4.5): string {
    let currentRatio = getContrastRatio(color, background);
    if (currentRatio >= targetRatio) return color;

    // Simple implementation: shift towards white or black
    // This is a placeholder for a more complex HSL shift
    return getLuminance(background) > 0.5 ? "#000000" : "#ffffff";
}
