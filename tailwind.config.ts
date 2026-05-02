import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                display: ["var(--font-display-en)"],
                zh: ["var(--font-display-zh)"],
            },
            borderRadius: {
                xs: "var(--r-xs)",
                sm: "var(--r-sm)",
                md: "var(--r-md)",
                lg: "var(--r-lg)",
                xl: "var(--r-xl)",
                pill: "var(--r-pill)",
            },
            colors: {
                // Semantic, consume from CSS variables
                bg: "var(--s-bg)",
                surface: "var(--s-surface)",
                ink: "var(--s-text)",
                muted: "var(--s-muted)",
                line: "var(--s-line)",
                primary: "var(--s-primary)",
                ai: "var(--ai)",
                progress: "var(--progress)",
                warning: "var(--warning)",
                accent: "var(--accent)",
                error: "var(--error)",
            },
            transitionTimingFunction: {
                soft: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
        },
    },
    plugins: [],
};
export default config;
