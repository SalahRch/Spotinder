export type Recommendation = {
    id: string;
    title: string;
    artist: string;
    albumImage: string;
};
export type DailyDiscovery = {
    id: string;
    date: string;
    goal: number;
    explored: number;
    liked: number;
    completed: boolean;
    completedAt: string | null;
};