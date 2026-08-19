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
export type AchievementRarity =
    | "DISCOVERY"
    | "RARE"
    | "MILESTONE";

export type Achievement = {
    type:
        | "BLIND_FAITH"
        | "OPEN_MIND"
        | "HOT_STREAK"
        | "FIRST_JOURNEY"
        | "HIDDEN_GEM";

    title: string | null;
    description: string | null;
    rarity: AchievementRarity;
    unlocked: boolean;
    unlockedAt: string | null;
    hidden: boolean;
};