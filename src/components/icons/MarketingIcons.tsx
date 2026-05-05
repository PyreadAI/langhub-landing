import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

const base: React.SVGProps<SVGSVGElement> = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

const make = (path: React.ReactNode) =>
    function IconComponent({ title, ...props }: IconProps) {
        return (
            <svg aria-hidden={title ? undefined : true} role={title ? "img" : undefined} {...base} {...props}>
                {title ? <title>{title}</title> : null}
                {path}
            </svg>
        );
    };

export const IconDashboard = make(
    <>
        <rect x="3" y="3" width="7" height="9" rx="2" />
        <rect x="14" y="3" width="7" height="5" rx="2" />
        <rect x="14" y="12" width="7" height="9" rx="2" />
        <rect x="3" y="16" width="7" height="5" rx="2" />
    </>
);

export const IconWriting = make(
    <>
        <path d="M4 20h16" />
        <path d="M5 16l9-9 4 4-9 9H5v-4z" />
        <path d="M13 7l4 4" />
    </>
);

export const IconSpeaking = make(
    <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3" />
    </>
);

export const IconDictation = make(
    <>
        <path d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
        <path d="M7 9v6" />
        <path d="M11 7v10" />
        <path d="M15 9v6" />
        <path d="M19 11v2" />
    </>
);

export const IconConjugation = make(
    <>
        <path d="M4 5h16" />
        <path d="M4 12h10" />
        <path d="M4 19h6" />
        <path d="M16 14l4 4-4 4" />
    </>
);

export const IconVocabulary = make(
    <>
        <path d="M5 4h11a3 3 0 0 1 3 3v13" />
        <path d="M5 4v16h14" />
        <path d="M9 9h6" />
        <path d="M9 13h4" />
    </>
);

export const IconExpressions = make(
    <>
        <path d="M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-4 3v-3H6a2 2 0 0 1-2-2z" />
        <path d="M9 18a2 2 0 0 0 2 2h5l3 2v-2h0a2 2 0 0 0 2-2v-4" />
    </>
);

export const IconAiProf = make(
    <>
        <path d="M12 3l1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6z" />
        <path d="M5 17l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
        <path d="M18 15l.8 1.7L20.5 17l-1.7.8L18 19.5l-.8-1.7L15.5 17l1.7-.8z" />
    </>
);

export const IconSearch = make(
    <>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-3.5-3.5" />
    </>
);

export const IconDocuments = make(
    <>
        <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
    </>
);

export const IconPlay = make(
    <path d="M8 5v14l11-7z" />
);

export const IconPause = make(
    <>
        <path d="M8 5v14" />
        <path d="M16 5v14" />
    </>
);

export const IconPlus = make(
    <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </>
);

export const IconSparkles = make(
    <>
        <path d="M12 4v4" />
        <path d="M12 16v4" />
        <path d="M4 12h4" />
        <path d="M16 12h4" />
        <path d="M6.3 6.3l2.5 2.5" />
        <path d="M15.2 15.2l2.5 2.5" />
        <path d="M6.3 17.7l2.5-2.5" />
        <path d="M15.2 8.8l2.5-2.5" />
    </>
);

export const IconArrowRight = make(
    <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </>
);

export const IconCheck = make(<path d="m5 12 5 5L20 7" />);

export const IconClose = make(
    <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
    </>
);

export const IconMenu = make(
    <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
    </>
);

export const IconClock = make(
    <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </>
);

export const IconSettings = make(
    <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.3 1.3a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0L4.3 17.9a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H3.5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4L5.6 4.3a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.3 1.3a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6z" />
    </>
);

export const IconTrash = make(
    <>
        <path d="M4 7h16" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
        <path d="M9 7V4h6v3" />
    </>
);

export const IconUser = make(
    <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20a8 8 0 0 1 16 0" />
    </>
);

export const IconSave = make(
    <>
        <path d="M5 4h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M8 4v6h8V4" />
        <path d="M8 17h8" />
    </>
);

export const IconExpand = make(
    <>
        <path d="M9 3H3v6" />
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M15 21h6v-6" />
    </>
);

export const IconVolume = make(
    <>
        <path d="M11 5 6 9H3v6h3l5 4z" />
        <path d="M15 9a4 4 0 0 1 0 6" />
        <path d="M17.5 6.5a7 7 0 0 1 0 11" />
    </>
);

export const IconRepeat = make(
    <>
        <path d="M17 2l4 4-4 4" />
        <path d="M3 11V9a3 3 0 0 1 3-3h15" />
        <path d="M7 22l-4-4 4-4" />
        <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </>
);

export const IconShield = make(
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
);

export const IconChart = make(
    <>
        <path d="M4 20h16" />
        <path d="M7 16V9" />
        <path d="M12 16V5" />
        <path d="M17 16v-7" />
    </>
);

export const IconBook = make(
    <>
        <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" />
        <path d="M4 19a2 2 0 0 0 2 2h12" />
    </>
);

export const IconHeadphone = make(
    <>
        <path d="M4 14a8 8 0 0 1 16 0" />
        <rect x="3" y="14" width="5" height="6" rx="2" />
        <rect x="16" y="14" width="5" height="6" rx="2" />
    </>
);

export const IconWand = make(
    <>
        <path d="m4 20 11-11" />
        <path d="m13 7 4 4" />
        <path d="M18 4v3" />
        <path d="M21 6h-3" />
        <path d="M19 11v2" />
        <path d="M21 12h-2" />
    </>
);

export const IconLogo = make(
    <>
        <path d="M4 19V5" />
        <path d="M4 19h12" />
        <circle cx="17" cy="7" r="3" />
    </>
);

export const IconAlert = make(
    <>
        <path d="M12 4 3 20h18z" />
        <path d="M12 10v4" />
        <path d="M12 17.5v.01" />
    </>
);

export const IconBulb = make(
    <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8 14a5 5 0 1 1 8 0c-.5.7-1 1.4-1 2.5V18H9v-1.5c0-1.1-.5-1.8-1-2.5z" />
    </>
);

export const IconTarget = make(
    <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
    </>
);

export const IconChevronRight = make(<path d="m9 6 6 6-6 6" />);

export const IconStar = make(
    <path d="m12 4 2.5 5 5.5.8-4 3.9 1 5.5L12 16.7 7 19.2l1-5.5-4-3.9 5.5-.8z" />
);

/* ── TTS / Audio icons (brand-guide compliant: thin outlined, 1.5 stroke) ── */

/** Microphone — used for TTS / voice generation trigger */
export const IconMic = make(
    <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3" />
    </>
);

/** Download arrow — used for audio download action */
export const IconDownload = make(
    <>
        <path d="M12 3v12" />
        <path d="m8 11 4 4 4-4" />
        <path d="M3 19h18" />
    </>
);

/** Refresh / regenerate — used for re-generate audio action */
export const IconRefresh = make(
    <>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
    </>
);

/** Coins / token — used for token cost display */
export const IconCoins = make(
    <>
        <circle cx="9" cy="9" r="6" />
        <path d="M15 9a6 6 0 0 1 0 12H9" />
        <path d="M9 15a3 3 0 1 0 0-6" />
    </>
);

/** Wallet / balance — used for token balance display */
export const IconWallet = make(
    <>
        <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 3H8L4 7h16z" />
        <circle cx="16" cy="13" r="1.5" />
    </>
);
