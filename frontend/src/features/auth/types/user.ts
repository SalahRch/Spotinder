export type SpotifyProduct = "FREE" | "PREMIUM";

export interface User {
    spotifyId: string;
    displayName: string;
    email: string;
    avatarUrl: string;
    country: string;
    product: SpotifyProduct;
    adventureLevel: number;
    blindModeDefault: boolean;
}