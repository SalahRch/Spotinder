export type SpotifyProduct = "FREE" | "PREMIUM";

export interface User {
    spotifyId: string;
    displayName: string;
    email: string;
    avatarUrl: string | null;
    country: string;
    product: SpotifyProduct;
    adventureLevel: number;
    blindModeDefault: boolean;
    onboardingCompleted: boolean;
}