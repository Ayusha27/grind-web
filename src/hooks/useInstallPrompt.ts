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

export type IosBrowser = "safari" | "chrome" | "edge" | "firefox" | "other";

// Every iOS browser runs on WebKit and its user agent still
// contains "Safari", so other browsers have to be identified
// by their own tokens (CriOS, EdgiOS, FxiOS).
const detectIosBrowser = (userAgent: string): IosBrowser => {
    if (/CriOS/.test(userAgent)) return "chrome";
    if (/EdgiOS/.test(userAgent)) return "edge";
    if (/FxiOS/.test(userAgent)) return "firefox";
    if (/Safari/.test(userAgent) && !/OPiOS|GSA|DuckDuckGo|Brave/.test(userAgent)) return "safari";
    return "other";
};

// Where the Share button lives in each iOS browser.
export const IOS_SHARE_LOCATION: Record<IosBrowser, string> = {
    safari: "at the bottom of Safari",
    chrome: "in Chrome's address bar",
    edge: "in Edge's ••• menu at the bottom",
    firefox: "in Firefox's ☰ menu",
    other: "in your browser's menu",
};

export const useInstallPrompt = () => {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);

    const [isInstalled, setIsInstalled] =
        useState(false);

    const [isIOS, setIsIOS] = useState(false);
    const [isSafari, setIsSafari] = useState(false);
    const [iosBrowser, setIosBrowser] = useState<IosBrowser>("safari");

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

        // Detect iOS (for custom install guide)
        const checkIsIOS = () => {
            const userAgent = window.navigator.userAgent || "";
            return /iPad|iPhone|iPod/.test(userAgent) || (userAgent.includes("Mac") && "ontouchend" in document);
        };

        const checkIsSafari = () => {
            const userAgent = window.navigator.userAgent || "";
            return userAgent.includes("Safari") && !/Chrome|CriOS|Edg|FxiOS|OPiOS/.test(userAgent);
        };

        setIsIOS(checkIsIOS());
        setIsSafari(checkIsSafari());
        setIosBrowser(detectIosBrowser(window.navigator.userAgent || ""));

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
        isIOS,
        isSafari,
        iosBrowser,
    };
};

export default useInstallPrompt;