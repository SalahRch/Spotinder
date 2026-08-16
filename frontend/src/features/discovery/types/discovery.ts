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
export type JourneyTrack = {
    spotifyTrackId: string;
    title: string;
    artist: string;
    albumImage: string | null;
};

export type DailyDiscoveryRecap = {
    id: string;
    date: string;
    journeyTitle: string;
    discoveryPersona:
        | "WILDCARD"
        | "EXPLORER"
        | "PURIST"
        | "ROMANTIC"
        | "CURATOR"
        | "WANDERER";
    recapMessage: string;
    explored: number;
    liked: number;
    likeRate: number;
    blindExplored: number;
    blindLiked: number;
    averageAdventureLevel: number;
    completedAt: string;
    tracks: JourneyTrack[];
};
export type JourneySummary = {
    id: string;
    date: string;
    journeyTitle: string;
    discoveryPersona:
        | "WILDCARD"
        | "EXPLORER"
        | "PURIST"
        | "ROMANTIC"
        | "CURATOR"
        | "WANDERER";
    explored: number;
    liked: number;
    likeRate: number;
    averageAdventureLevel: number;
    completedAt: string;
};