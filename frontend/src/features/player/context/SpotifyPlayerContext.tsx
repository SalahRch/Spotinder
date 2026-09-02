import {
    useState,
} from "react";

import {
    SpotifyPlayerContext,
} from "./PlayerContext.ts";

import { useAuth } from "@/features/auth/hooks/useAuth";

import type {
    PlaybackSource,
    PlayerTrack,
} from "./PlayerContext.ts";

import type {
    ReactNode,
} from "react";

import toast from "react-hot-toast";

import { playSpotifyTrack } from "../api/playback";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";

type SpotifyPlayerProviderProps = {
    children: ReactNode;
};

export function SpotifyPlayerProvider({
                                          children,
                                      }: SpotifyPlayerProviderProps) {
    const { user } = useAuth();

    const hasInAppPlayback =
        user?.product === "PREMIUM";

    const spotifyPlayer =
        useSpotifyPlayer(
            hasInAppPlayback,
        );

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
        if (!hasInAppPlayback) {
            window.open(
                `https://open.spotify.com/track/${track.id}`,
                "_blank",
                "noopener,noreferrer",
            );

            return;
        }

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
