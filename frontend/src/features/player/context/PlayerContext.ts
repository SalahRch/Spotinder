import {
    createContext,
    useContext,
} from "react";

export type PlayerTrack = {
    id: string;
    title: string;
    artist: string;
    albumImage: string | null;
};

export type PlaybackSource =
    | "discover"
    | "likes";

export type SpotifyPlayerContextValue = {
    currentTrack: PlayerTrack | null;

    deviceId: string | null;
    isReady: boolean;
    isPlaying: boolean;

    playbackSource: PlaybackSource | null;

    position: number;
    duration: number;

    playTrack: (
        track: PlayerTrack,
        source: PlaybackSource,
    ) => Promise<void>;

    toggleTrack: (
        track: PlayerTrack,
        source: PlaybackSource,
    ) => Promise<void>;

    pause: () => Promise<void>;
    resume: () => Promise<void>;
    restart: () => Promise<void>;

    seek: (
        positionMs: number,
    ) => Promise<void>;

    stopAndReset: () => Promise<void>;
};

export const SpotifyPlayerContext =
    createContext<
        SpotifyPlayerContextValue | undefined
    >(undefined);

export function usePlayer() {
    const context =
        useContext(
            SpotifyPlayerContext,
        );

    if (!context) {
        throw new Error(
            "usePlayer must be used inside SpotifyPlayerProvider.",
        );
    }

    return context;
}