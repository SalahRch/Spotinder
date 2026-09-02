import {
    useEffect,
    useRef,
    useState,
} from "react";

import { getSpotifyPlaybackToken } from "../api/playback";

export function useSpotifyPlayer(
    enabled: boolean,
) {
    const playerRef =
        useRef<SpotifyPlayer | null>(null);

    const [isPlaying, setIsPlaying] =
        useState(false);

    const resetPlaybackState = () => {
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
        setCurrentTrackId(null);
    };

    const [position, setPosition] =
        useState(0);

    const [duration, setDuration] =
        useState(0);

    const [currentTrackId, setCurrentTrackId] =
        useState<string | null>(null);

    const [deviceId, setDeviceId] =
        useState<string | null>(null);

    const [isReady, setIsReady] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        if (!enabled) {
            setDeviceId(null);
            setIsReady(false);
            setError(null);

            setIsPlaying(false);
            setPosition(0);
            setDuration(0);
            setCurrentTrackId(null);

            return;
        }

        let cancelled = false;

        const initializePlayer = () => {
            if (
                cancelled ||
                playerRef.current ||
                !window.Spotify
            ) {
                return;
            }

            const player =
                new window.Spotify.Player({
                    name: "Spotinder Web Player",

                    getOAuthToken: async (
                        callback,
                    ) => {
                        try {
                            const token =
                                await getSpotifyPlaybackToken();

                            callback(token);
                        } catch {
                            setError(
                                "Unable to authenticate Spotify playback.",
                            );
                        }
                    },

                    volume: 0.5,
                });

            player.addListener(
                "ready",
                ({ device_id }) => {
                    if (cancelled) {
                        return;
                    }

                    console.log(
                        "Spotinder player ready:",
                        device_id,
                    );

                    setDeviceId(device_id);
                    setIsReady(true);
                    setError(null);
                },
            );

            player.addListener(
                "not_ready",
                ({ device_id }) => {
                    console.warn(
                        "Spotinder player offline:",
                        device_id,
                    );

                    setDeviceId(null);
                    setIsReady(false);
                },
            );

            player.addListener(
                "player_state_changed",
                (state) => {
                    if (cancelled) {
                        return;
                    }

                    if (!state) {
                        setIsPlaying(false);
                        setPosition(0);
                        setDuration(0);
                        setCurrentTrackId(null);

                        return;
                    }

                    setIsPlaying(
                        !state.paused,
                    );

                    setPosition(
                        state.position,
                    );

                    setDuration(
                        state.duration,
                    );

                    setCurrentTrackId(
                        state
                            .track_window
                            .current_track
                            .id,
                    );
                },
            );

            player.addListener(
                "initialization_error",
                ({ message }) => {
                    setError(message);
                },
            );

            player.addListener(
                "authentication_error",
                ({ message }) => {
                    setError(message);
                },
            );

            player.addListener(
                "account_error",
                ({ message }) => {
                    setError(message);
                },
            );

            player.addListener(
                "playback_error",
                ({ message }) => {
                    setError(message);
                },
            );

            playerRef.current = player;

            void player.connect();
        };

        if (window.Spotify) {
            initializePlayer();
        } else {
            window.onSpotifyWebPlaybackSDKReady =
                initializePlayer;

            const existingScript =
                document.querySelector(
                    'script[src="https://sdk.scdn.co/spotify-player.js"]',
                );

            if (!existingScript) {
                const script =
                    document.createElement(
                        "script",
                    );

                script.src =
                    "https://sdk.scdn.co/spotify-player.js";

                script.async = true;

                document.body.appendChild(
                    script,
                );
            }
        }

        return () => {
            cancelled = true;

            playerRef.current?.disconnect();
            playerRef.current = null;
        };
    }, [enabled]);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }

        const interval =
            window.setInterval(() => {
                setPosition(
                    (current) => {
                        if (!duration) {
                            return current;
                        }

                        return Math.min(
                            current + 500,
                            duration,
                        );
                    },
                );
            }, 500);

        return () => {
            window.clearInterval(
                interval,
            );
        };
    }, [
        isPlaying,
        duration,
    ]);

    const pause = async () => {
        if (!playerRef.current) {
            return;
        }

        await playerRef.current.pause();
    };

    const resume = async () => {
        if (!playerRef.current) {
            return;
        }

        await playerRef.current.resume();
    };

    const seek = async (
        positionMs: number,
    ) => {
        if (!playerRef.current) {
            return;
        }

        await playerRef.current.seek(
            positionMs,
        );
    };

    const restart = async () => {
        if (!playerRef.current) {
            return;
        }

        await playerRef.current.seek(0);

        await playerRef.current.resume();
    };

    return {

        deviceId,
        isReady,
        error,

        isPlaying,
        position,
        duration,
        currentTrackId,

        pause,
        resume,
        seek,
        restart,
        resetPlaybackState,
    };
}