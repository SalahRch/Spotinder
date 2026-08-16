import {
    useEffect,
    useState,
} from "react";

import type {
    JourneyTrack,
} from "../types/discovery";

import {
    extractAlbumColor,
} from "../utils/extractAlbumColor";

export function useJourneyAlbumColors(
    tracks: JourneyTrack[],
) {
    const [
        colors,
        setColors,
    ] = useState<Record<string, string>>({});

    useEffect(() => {
        let cancelled = false;

        async function loadColors() {
            const entries =
                await Promise.all(
                    tracks.map(
                        async (track) => {
                            if (!track.albumImage) {
                                return [
                                    track.spotifyTrackId,
                                    "#A78BFA",
                                ] as const;
                            }

                            try {
                                const color =
                                    await extractAlbumColor(
                                        track.albumImage,
                                    );

                                return [
                                    track.spotifyTrackId,
                                    color,
                                ] as const;
                            } catch {
                                return [
                                    track.spotifyTrackId,
                                    "#A78BFA",
                                ] as const;
                            }
                        },
                    ),
                );

            if (!cancelled) {
                setColors(
                    Object.fromEntries(entries),
                );
            }
        }

        void loadColors();

        return () => {
            cancelled = true;
        };
    }, [tracks]);

    return colors;
}