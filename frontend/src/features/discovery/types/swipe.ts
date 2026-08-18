export type SwipeDirection =
    "RIGHT" | "LEFT";

export type SwipeRequest = {
    spotifyTrackId: string;
    direction: SwipeDirection;
    blindMode: boolean;
    adventureLevel: number;
};

export type AchievementUnlock = {
    type:
        | "BLIND_FAITH"
        | "OPEN_MIND"
        | "HOT_STREAK"
        | "FIRST_JOURNEY"
        | "HIDDEN_GEM";

    title: string;
    description: string;
};

export type SwipeResponse = {
    id: string;
    spotifyTrackId: string;
    direction: SwipeDirection;
    blindMode: boolean;
    message: string;
    unlockedAchievements: AchievementUnlock[];
};