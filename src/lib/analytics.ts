/**
 * Analytics shim. V1 only logs to console in dev. Replace with a real
 * analytics provider later (e.g., Plausible/Umami) without touching call
 * sites.
 */

export type EventName =
    | "landing_view"
    | "hero_demo_module_change"
    | "hero_demo_visible"
    | "hero_video_open"
    | "hero_video_close"
    | "video_modal_open"
    | "video_modal_close"
    | "start_free_click"
    | "pricing_link_click"
    | "contact_click"
    | "footer_link_click"
    | "cta_click"
    | "theme_toggle"
    | "locale_switch"
    | "nav_link_click";

export interface AnalyticsPayload {
    [key: string]: string | number | boolean | undefined;
}

export function track(event: EventName, payload?: AnalyticsPayload): void {

    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.debug("[analytics]", event, payload || {});
    }
    // future: window.plausible?.(event, { props: payload })
}
