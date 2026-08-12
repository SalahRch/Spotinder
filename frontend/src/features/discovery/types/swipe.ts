export type SwipeDirection =
    "RIGHT" | "LEFT";

export type SwipeRequest = {
    spotifyTrackId: string;
    direction: SwipeDirection;
    blindMode: boolean;
    adventureLevel: number;
};

export type SwipeResponse = {
    id: string;
    spotifyTrackId: string;
    direction: SwipeDirection;
    blindMode: boolean;
    message: string;
};