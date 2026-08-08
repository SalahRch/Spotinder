import {
    createContext,
    useContext,
    useState,
} from "react";

import type {
    ReactNode,
} from "react";

import toast from "react-hot-toast";

import { playSpotifyTrack } from "../api/playback";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";

export type PlayerTrack = {
    id: string;
    title: string;
    artist: string;
    albumImage: string | null;
};

export type PlaybackSource =
    | "discover"
    | "likes";

type SpotifyPlayerContextValue = {
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

const SpotifyPlayerContext =
    createContext<
        SpotifyPlayerContextValue | undefined
    >(undefined);

type SpotifyPlayerProviderProps = {
    children: ReactNode;
};

export function SpotifyPlayerProvider({
                                          children,
                                      }: SpotifyPlayerProviderProps) {
    const spotifyPlayer =
        useSpotifyPlayer();

    const [
        currentTrack,
        setCurrentTrack,
    ] = useState<PlayerTrack | null>(
        null,
    );

    const [
        playbackSource,
        setPlaybackSource,
    ] = useState<PlaybackSource | null>(
        null,
    );

    const playTrack = async (
        track: PlayerTrack,
        source: PlaybackSource,
    ) => {
        if (!spotifyPlayer.deviceId) {
            toast.error(
                "Spotify player is still connecting.",
            );

            return;
        }

        try {
            await playSpotifyTrack({
                deviceId:
                spotifyPlayer.deviceId,

                spotifyTrackId:
                track.id,
            });

            setCurrentTrack(track);
            setPlaybackSource(source);
        } catch (error) {
            console.error(
                "Unable to start Spotify playback:",
                error,
            );

            toast.error(
                "We couldn't start playback.",
            );
        }
    };

    const toggleTrack = async (
        track: PlayerTrack,
        source: PlaybackSource,
    ) => {
        const sameTrack =
            spotifyPlayer.currentTrackId ===
            track.id;

        try {
            if (
                sameTrack &&
                spotifyPlayer.isPlaying
            ) {
                setCurrentTrack(track);
                setPlaybackSource(source);

                await spotifyPlayer.pause();

                return;
            }

            if (
                sameTrack &&
                !spotifyPlayer.isPlaying
            ) {
                await spotifyPlayer.resume();

                setCurrentTrack(track);
                setPlaybackSource(source);

                return;
            }

            await playTrack(
                track,
                source,
            );
        } catch (error) {
            console.error(
                "Unable to control Spotify playback:",
                error,
            );
        }
    };

    const stopAndReset = async () => {
        spotifyPlayer.resetPlaybackState();

        try {
            await spotifyPlayer.pause();
        } catch (error) {
            console.error(
                "Unable to pause Spotify playback:",
                error,
            );
        }

        setCurrentTrack(null);
        setPlaybackSource(null);
    };

    return (
        <SpotifyPlayerContext.Provider
            value={{
                currentTrack,

                playbackSource,

                deviceId:
                spotifyPlayer.deviceId,

                isReady:
                spotifyPlayer.isReady,

                isPlaying:
                spotifyPlayer.isPlaying,

                position:
                spotifyPlayer.position,

                duration:
                spotifyPlayer.duration,

                playTrack,
                toggleTrack,

                pause:
                spotifyPlayer.pause,

                resume:
                spotifyPlayer.resume,

                restart:
                spotifyPlayer.restart,

                seek:
                spotifyPlayer.seek,

                stopAndReset,
            }}
        >
            {children}
        </SpotifyPlayerContext.Provider>
    );
}

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