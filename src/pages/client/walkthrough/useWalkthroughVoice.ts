import { useEffect } from "react";

interface UseWalkthroughVoiceProps {
    text: string;
    enabled: boolean;
    rate?: number;
    pitch?: number;
}

const useWalkthroughVoice = ({
    text,
    enabled,
    rate = 0.95,
    pitch = 1,
}: UseWalkthroughVoiceProps) => {
    useEffect(() => {
        if (!enabled || !text) {
            return;
        }

        if (
            typeof window ===
            "undefined" ||
            !("speechSynthesis" in window)
        ) {
            return;
        }

        const synth =
            window.speechSynthesis;

        synth.cancel();

        const utterance =
            new SpeechSynthesisUtterance(
                text
            );

        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = 1;

        synth.speak(utterance);

        return () => {
            synth.cancel();
        };
    }, [
        text,
        enabled,
        rate,
        pitch,
    ]);
};

export default useWalkthroughVoice;