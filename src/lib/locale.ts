export type Locale = "zh" | "en";

export const SUPPORTED_LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";

export function isLocale(value: string | undefined | null): value is Locale {
    return value === "zh" || value === "en";
}
