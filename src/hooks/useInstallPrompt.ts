import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];

    prompt(): Promise<void>;

    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

export const useInstallPrompt = () => {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    const [isInstalled, setIsInstalled] =
        useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (
            event: BeforeInstallPromptEvent
        ) => {
            // Prevent Chrome from showing its automatic
            // installation prompt.
            event.preventDefault();

            setInstallPrompt(event);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setInstallPrompt(null);
        };

        // Detect if Grind is already running as an
        // installed standalone web app.
        const standalone =
            window.matchMedia(
                "(display-mode: standalone)"
            ).matches ||
            (window.navigator as Navigator & {
                standalone?: boolean;
            }).standalone === true;

        setIsInstalled(standalone);

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        window.addEventListener(
            "appinstalled",
            handleAppInstalled
        );

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );

            window.removeEventListener(
                "appinstalled",
                handleAppInstalled
            );
        };
    }, []);

    const installApp = useCallback(async () => {
        if (!installPrompt) {
            return false;
        }

        await installPrompt.prompt();

        const choice = await installPrompt.userChoice;

        if (choice.outcome === "accepted") {
            setIsInstalled(true);
        }

        setInstallPrompt(null);

        return choice.outcome === "accepted";
    }, [installPrompt]);

    return {
        canInstall: !!installPrompt && !isInstalled,
        isInstalled,
        installApp,
    };
};

export default useInstallPrompt;