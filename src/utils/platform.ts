/**
 * True when GRIND is running as an installed Home Screen
 * app on iPhone / iPad.
 *
 * iOS gives Home Screen apps their own storage, separate
 * from Safari / Chrome, so a token saved in the browser is
 * not available here. Android and desktop share storage
 * between the browser and the installed app.
 */
export const isIosStandaloneApp = (): boolean => {
    const userAgent = window.navigator.userAgent || "";

    const isIosDevice =
        /iPad|iPhone|iPod/.test(userAgent) ||
        (userAgent.includes("Mac") && "ontouchend" in document);

    const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean })
            .standalone === true;

    return isIosDevice && isStandalone;
};
