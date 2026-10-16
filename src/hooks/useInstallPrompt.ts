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

// Chrome fires `beforeinstallprompt` only once per page load, usually
// before the dashboard has mounted (e.g. while the user is still on the
// login page). Capture it at module load so it is never missed.
let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
        // Prevent Chrome from showing its automatic
        // installation prompt.
        event.preventDefault();
        deferredPrompt = event;
        notify();
    });

    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        notify();
    });
}

export const useInstallPrompt = () => {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(deferredPrompt);

    const [isInstalled, setIsInstalled] =
        useState(false);

    const [isIOS, setIsIOS] = useState(false);
    const [isSafari, setIsSafari] = useState(false);
    const [iosBrowser, setIosBrowser] = useState<IosBrowser>("safari");

    useEffect(() => {
        const sync = () => setInstallPrompt(deferredPrompt);

        const handleAppInstalled = () => {
            setIsInstalled(true);
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

        listeners.add(sync);
        sync();

        window.addEventListener(
            "appinstalled",
            handleAppInstalled
        );

        return () => {
            listeners.delete(sync);

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

        // A prompt can only be used once.
        deferredPrompt = null;
        notify();

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