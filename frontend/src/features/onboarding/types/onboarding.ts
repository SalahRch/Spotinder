export type OnboardingTrack = {
    spotifyTrackId: string;
    title: string;
    artist: string;
    albumImage: string | null;
};

export type OnboardingProfile = {
    topArtists: string[];
    topTracks: OnboardingTrack[];
    songsAnalyzed: number;
};