/**
 * Centralized external app routes for the marketing landing.
 * All values come from public env vars (NEXT_PUBLIC_*) so we never hard-code
 * production URLs in components.
 */

const fallbackLogin = "https://app.langprephub.com/login";
const fallbackRegister = "https://app.langprephub.com/register";
const fallbackSite = "https://www.langprephub.com";

export const APP_LOGIN_URL =
    process.env.NEXT_PUBLIC_APP_LOGIN_URL || fallbackLogin;

export const APP_REGISTER_URL =
    process.env.NEXT_PUBLIC_APP_REGISTER_URL || fallbackRegister;

export const MARKETING_SITE_URL =
    process.env.NEXT_PUBLIC_MARKETING_SITE_URL || fallbackSite;

export const ASSET_BASE_URL =
    process.env.NEXT_PUBLIC_ASSET_BASE_URL || "";

export const REGION =
    process.env.NEXT_PUBLIC_REGION || "global";

export function asset(path: string): string {
    if (!path) return path;
    if (path.startsWith("http")) return path;
    if (!ASSET_BASE_URL) return path.startsWith("/") ? path : `/${path}`;
    return `${ASSET_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
