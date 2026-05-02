import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Langhub · French AI Learning Platform",
    description:
        "Langhub — the all-in-one French AI learning platform: writing, speaking, dictation, conjugation, vocabulary, and expressions in one workspace.",
    icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
    themeColor: "#F4EFE6",
    width: "device-width",
    initialScale: 1,
};

const themeBootstrap = `(function(){try{var k='langhub.mode';var v=localStorage.getItem(k);if(v!=='soft'&&v!=='dark'){v='soft'}document.documentElement.setAttribute('data-mode',v);}catch(e){document.documentElement.setAttribute('data-mode','soft');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN" data-mode="soft">
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
            </head>
            <body>{children}</body>
        </html>
    );
}
