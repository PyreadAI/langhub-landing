"use client";

import { IconArrowRight, IconClose, IconDictation, IconDocuments, IconVolume, IconWriting } from "@/components/icons/MarketingIcons";

interface Props {
    onClose: () => void;
    onStartTts: () => void;
}

const options = [
    {
        key: "upload",
        label: "Upload Audio",
        desc: "Upload an audio file and transcribe it for dictation",
        disabled: true,
    },
    {
        key: "tts",
        label: "Text to Speech",
        desc: "Enter or paste French text to generate segment audio",
        disabled: false,
    },
    {
        key: "library",
        label: "Audio Library",
        desc: "Use an existing generated audio file",
        disabled: true,
    },
];

function SourceIcon({ type }: { type: string }) {
    if (type === "upload") return <IconVolume width={20} height={20} />;
    if (type === "tts") return <IconWriting width={20} height={20} />;
    return <IconDocuments width={20} height={20} />;
}

export function MockSourceSelector({ onClose, onStartTts }: Props) {
    return (
        <div className="dt-modal-overlay" onClick={onClose}>
            <div className="dt-source-modal" onClick={(event) => event.stopPropagation()}>
                <div className="dt-source-modal-header">
                    <h3><IconDictation width={18} height={18} /> New Dictation Session</h3>
                    <button type="button" onClick={onClose} aria-label="Close source selector"><IconClose width={16} height={16} /></button>
                </div>
                <div className="dt-source-options">
                    {options.map((option) => (
                        <button
                            key={option.key}
                            className={`dt-source-option ${option.disabled ? "dt-source-option--disabled" : ""}`}
                            type="button"
                            onClick={option.disabled ? undefined : onStartTts}
                            disabled={option.disabled}
                        >
                            <span className="dt-source-option-icon"><SourceIcon type={option.key} /></span>
                            <span className="dt-source-option-info">
                                <strong>{option.label}</strong>
                                <small>{option.desc}</small>
                            </span>
                            {!option.disabled ? <IconArrowRight width={15} height={15} /> : <span className="dt-source-option-soon">Preview only</span>}
                        </button>
                    ))}
                </div>
                <div className="dt-tts-preview">
                    <span>Preview text</span>
                    <p>À mes yeux, il convient de souligner que les avantages de l’avancée des technologies l’emportent sur les inconvénients.</p>
                </div>
            </div>
        </div>
    );
}
