const TOKEN_KEY = "grind_token";

/**
 * Save the user's GRIND access token.
 */
export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get the currently stored GRIND access token.
 */
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove the stored GRIND access token.
 */
export const clearToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Initialize the GRIND token.
 *
 * First priority:
 *   ?token=XXXX from the URL
 *
 * If a token is found:
 *   1. Save it to localStorage.
 *   2. Remove it from the browser URL.
 *
 * If no URL token exists:
 *   use the previously saved localStorage token.
 */
export const initializeToken = (): string | null => {
    const params = new URLSearchParams(
        window.location.search
    );

    const urlToken = params.get("token");

    if (urlToken) {
        const token = urlToken.trim();

        if (token) {
            saveToken(token);

            /**
             * Remove the token from the visible URL.
             *
             * Example:
             *
             * /client/dashboard/progress?token=ABC123
             *
             * becomes:
             *
             * /client/dashboard/progress
             */
            const cleanUrl =
                window.location.pathname +
                window.location.hash;

            window.history.replaceState(
                {},
                document.title,
                cleanUrl
            );

            return token;
        }
    }

    return getToken();
};