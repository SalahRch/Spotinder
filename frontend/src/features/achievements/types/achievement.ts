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