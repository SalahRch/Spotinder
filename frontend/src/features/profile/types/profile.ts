export type SpotifyProduct =
    | "FREE"
    | "PREMIUM";

export type Profile = {
    spotifyId: string;
    displayName: string;
    email: string;
    avatarUrl: string | null;
    country: string;
    product: SpotifyProduct;
    adventureLevel: number;
    blindModeDefault: boolean;
    createdAt: string;
};

export type UpdatePreferencesRequest = {
    adventureLevel?: number;
    blindModeDefault?: boolean;
};