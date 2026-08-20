import {
    motion,
} from "framer-motion";

import type {
    DailyDiscoveryRecap,
    JourneyTrack,
} from "../types/discovery";

type JourneyShareArtworkProps = {
    recap: DailyDiscoveryRecap;

    albumColors:
        Record<string, string>;
};

export default function JourneyShareArtwork({
                                                recap,
                                                albumColors,
                                            }: JourneyShareArtworkProps) {
    /*
     * Prioritize liked tracks because those
     * are the discoveries the user actually
     * kept.
     */
    const likedTracks =
        recap.tracks.filter(
            (track) =>
                track.direction ===
                "RIGHT",
        );

    const artworkTracks =
        [
            ...likedTracks,
            ...recap.tracks.filter(
                (track) =>
                    track.direction !==
                    "RIGHT",
            ),
        ].slice(
            0,
            3,
        );

    return (
        <div
            className="
                relative
                h-[285px]
                w-full
                overflow-hidden
            "
        >
            {recap.discoveryPersona ===
                "ROMANTIC" && (
                    <RomanticArtwork
                        tracks={
                            artworkTracks
                        }
                        albumColors={
                            albumColors
                        }
                    />
                )}

            {recap.discoveryPersona ===
                "WANDERER" && (
                    <WandererArtwork
                        tracks={
                            artworkTracks
                        }
                        albumColors={
                            albumColors
                        }
                    />
                )}

            {recap.discoveryPersona ===
                "EXPLORER" && (
                    <ExplorerArtwork
                        tracks={
                            artworkTracks
                        }
                        albumColors={
                            albumColors
                        }
                    />
                )}

            {recap.discoveryPersona ===
                "PURIST" && (
                    <PuristArtwork
                        tracks={
                            artworkTracks
                        }
                        albumColors={
                            albumColors
                        }
                    />
                )}

            {recap.discoveryPersona ===
                "CURATOR" && (
                    <CuratorArtwork
                        tracks={
                            artworkTracks
                        }
                        albumColors={
                            albumColors
                        }
                    />
                )}

            {recap.discoveryPersona ===
                "WILDCARD" && (
                    <WildcardArtwork
                        tracks={
                            artworkTracks
                        }
                        albumColors={
                            albumColors
                        }
                    />
                )}
        </div>
    );
}

/* =========================================================
   SHARED ALBUM CARD
   ========================================================= */

type AlbumCardProps = {
    track?: JourneyTrack;
    albumColors:
        Record<string, string>;

    className?: string;

    rotate?: number;
    delay?: number;
};

function AlbumCard({
                       track,
                       albumColors,
                       className = "",
                       rotate = 0,
                       delay = 0,
                   }: AlbumCardProps) {
    if (!track) {
        return null;
    }

    const color =
        albumColors[
            track.spotifyTrackId
            ] ?? "#A78BFA";

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.86,
                rotate:
                    rotate - 4,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: [
                    rotate,
                    rotate + 1.5,
                    rotate,
                ],
                y: [
                    0,
                    -5,
                    0,
                ],
            }}
            transition={{
                opacity: {
                    delay,
                    duration: 0.5,
                },

                scale: {
                    delay,
                    duration: 0.5,
                },

                rotate: {
                    delay,
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                },

                y: {
                    delay,
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            style={{
                boxShadow:
                    `0 18px 45px ${color}22`,
            }}
            className={`
                absolute
                overflow-hidden
                rounded-[18px]
                border
                border-white/[0.12]
                bg-[#111827]
                shadow-xl

                ${className}
            `}
        >
            {track.albumImage ? (
                <img
                    src={
                        track.albumImage
                    }
                    alt=""
                    className="
                        h-full
                        w-full
                        object-cover
                    "
                />
            ) : (
                <div
                    className="
                        h-full
                        w-full
                        bg-gradient-to-br
                        from-violet-500/25
                        to-cyan-500/15
                    "
                />
            )}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/25
                    to-transparent
                "
            />
        </motion.div>
    );
}

/* =========================================================
   ROMANTIC
   Intertwining melodies + covers as connected memories.
   ========================================================= */

function RomanticArtwork({
                             tracks,
                             albumColors,
                         }: {
    tracks: JourneyTrack[];
    albumColors:
        Record<string, string>;
}) {
    return (
        <>
            <motion.svg
                viewBox="0 0 390 280"
                fill="none"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                "
            >
                <motion.path
                    d="
                        M -20 60
                        C 80 10, 115 150, 195 140
                        C 270 130, 295 50, 420 95
                    "
                    stroke="rgba(244,114,182,0.34)"
                    strokeWidth="1.2"
                    animate={{
                        opacity: [
                            0.45,
                            0.9,
                            0.45,
                        ],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.path
                    d="
                        M -10 215
                        C 80 270, 120 145, 195 140
                        C 275 135, 315 255, 410 205
                    "
                    stroke="rgba(196,181,253,0.30)"
                    strokeWidth="1.2"
                    animate={{
                        opacity: [
                            0.4,
                            0.8,
                            0.4,
                        ],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.svg>

            <AlbumCard
                track={tracks[0]}
                albumColors={
                    albumColors
                }
                rotate={-7}
                className="
                    left-[9%]
                    top-[28%]
                    h-[76px]
                    w-[76px]
                "
            />

            <AlbumCard
                track={tracks[1]}
                albumColors={
                    albumColors
                }
                rotate={5}
                delay={0.12}
                className="
                    right-[10%]
                    top-[25%]
                    h-[70px]
                    w-[70px]
                "
            />

            <AlbumCard
                track={tracks[2]}
                albumColors={
                    albumColors
                }
                rotate={-2}
                delay={0.22}
                className="
                    bottom-[8%]
                    left-1/2
                    h-[84px]
                    w-[84px]
                    -translate-x-1/2
                "
            />

            <motion.span
                animate={{
                    opacity: [
                        0.25,
                        0.65,
                        0.25,
                    ],
                    scale: [
                        1,
                        1.1,
                        1,
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    left-1/2
                    top-[27%]
                    -translate-x-1/2
                    text-lg
                    text-fuchsia-200/45
                "
            >
                ♡
            </motion.span>
        </>
    );
}

/* =========================================================
   WANDERER
   Covers become stops along a route.
   ========================================================= */

function WandererArtwork({
                             tracks,
                             albumColors,
                         }: {
    tracks: JourneyTrack[];
    albumColors:
        Record<string, string>;
}) {
    return (
        <>
            <svg
                viewBox="0 0 390 280"
                fill="none"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                "
            >
                <motion.path
                    d="
                        M -10 205
                        C 60 125, 90 75, 145 100
                        C 195 123, 160 220, 240 215
                        C 300 210, 295 65, 410 90
                    "
                    stroke="rgba(196,181,253,0.30)"
                    strokeWidth="1.3"
                    strokeDasharray="5 8"
                    animate={{
                        strokeDashoffset: [
                            0,
                            -26,
                        ],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </svg>

            <Waypoint
                left="9%"
                top="67%"
            />

            <Waypoint
                left="37%"
                top="34%"
                delay={0.5}
            />

            <Waypoint
                left="82%"
                top="30%"
                delay={1}
            />

            <AlbumCard
                track={tracks[0]}
                albumColors={
                    albumColors
                }
                rotate={-5}
                className="
                    left-[10%]
                    top-[42%]
                    h-[72px]
                    w-[72px]
                "
            />

            <AlbumCard
                track={tracks[1]}
                albumColors={
                    albumColors
                }
                rotate={4}
                delay={0.1}
                className="
                    left-[44%]
                    top-[50%]
                    h-[78px]
                    w-[78px]
                "
            />

            <AlbumCard
                track={tracks[2]}
                albumColors={
                    albumColors
                }
                rotate={-3}
                delay={0.2}
                className="
                    right-[8%]
                    top-[17%]
                    h-[70px]
                    w-[70px]
                "
            />
        </>
    );
}

/* =========================================================
   EXPLORER
   Covers become discoveries on a map/radar.
   ========================================================= */

function ExplorerArtwork({
                             tracks,
                             albumColors,
                         }: {
    tracks: JourneyTrack[];
    albumColors:
        Record<string, string>;
}) {
    return (
        <>
            <div
                className="
                    absolute
                    -left-[20%]
                    top-[4%]
                    h-[250px]
                    w-[250px]
                "
            >
                {[0, 1, 2, 3].map(
                    (index) => (
                        <motion.div
                            key={index}
                            animate={{
                                scale: [
                                    1,
                                    1.035,
                                    1,
                                ],
                            }}
                            transition={{
                                duration:
                                    6 +
                                    index,
                                repeat:
                                Infinity,
                                ease:
                                    "easeInOut",
                            }}
                            style={{
                                inset:
                                    index *
                                    25,
                                rotate:
                                    `${index * 13}deg`,
                            }}
                            className="
                                absolute
                                rounded-[48%_52%_43%_57%]
                                border
                                border-cyan-300/[0.17]
                            "
                        />
                    ),
                )}
            </div>

            <div
                className="
                    absolute
                    -right-[13%]
                    bottom-[-5%]
                    h-[230px]
                    w-[230px]
                "
            >
                {[0, 1, 2].map(
                    (index) => (
                        <div
                            key={index}
                            style={{
                                inset:
                                    index *
                                    38,
                            }}
                            className="
                                absolute
                                rounded-full
                                border
                                border-violet-300/[0.16]
                            "
                        />
                    ),
                )}

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-px
                        w-[48%]
                        origin-left
                        bg-gradient-to-r
                        from-cyan-200/60
                        to-transparent
                    "
                />
            </div>

            <AlbumCard
                track={tracks[0]}
                albumColors={
                    albumColors
                }
                rotate={-5}
                className="
                    left-[10%]
                    top-[20%]
                    h-[76px]
                    w-[76px]
                "
            />

            <AlbumCard
                track={tracks[1]}
                albumColors={
                    albumColors
                }
                rotate={4}
                delay={0.1}
                className="
                    right-[11%]
                    top-[16%]
                    h-[68px]
                    w-[68px]
                "
            />

            <AlbumCard
                track={tracks[2]}
                albumColors={
                    albumColors
                }
                rotate={-2}
                delay={0.2}
                className="
                    bottom-[6%]
                    left-[42%]
                    h-[84px]
                    w-[84px]
                "
            />
        </>
    );
}

/* =========================================================
   PURIST
   Ordered symmetry.
   ========================================================= */

function PuristArtwork({
                           tracks,
                           albumColors,
                       }: {
    tracks: JourneyTrack[];
    albumColors:
        Record<string, string>;
}) {
    const bars = [
        14,
        24,
        42,
        66,
        88,
        66,
        42,
        24,
        14,
    ];

    return (
        <>
            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    gap-[6px]
                    opacity-70
                "
            >
                {bars.map(
                    (
                        height,
                        index,
                    ) => (
                        <motion.span
                            key={index}
                            animate={{
                                height: [
                                    height *
                                    0.8,
                                    height,
                                    height *
                                    0.8,
                                ],
                                opacity: [
                                    0.35,
                                    0.7,
                                    0.35,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat:
                                Infinity,
                                delay:
                                    index *
                                    0.06,
                            }}
                            style={{
                                height,
                            }}
                            className="
                                w-px
                                bg-gradient-to-b
                                from-cyan-200/50
                                to-violet-200/40
                            "
                        />
                    ),
                )}
            </div>

            <AlbumCard
                track={tracks[0]}
                albumColors={
                    albumColors
                }
                className="
                    left-[8%]
                    top-1/2
                    h-[74px]
                    w-[74px]
                    -translate-y-1/2
                "
            />

            <AlbumCard
                track={tracks[1]}
                albumColors={
                    albumColors
                }
                delay={0.12}
                className="
                    right-[8%]
                    top-1/2
                    h-[74px]
                    w-[74px]
                    -translate-y-1/2
                "
            />

            <AlbumCard
                track={tracks[2]}
                albumColors={
                    albumColors
                }
                delay={0.2}
                className="
                    bottom-[4%]
                    left-1/2
                    h-[64px]
                    w-[64px]
                    -translate-x-1/2
                "
            />

            <div
                className="
                    absolute
                    left-[8%]
                    right-[8%]
                    top-[18%]
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-200/25
                    to-transparent
                "
            />
        </>
    );
}

/* =========================================================
   CURATOR
   Actual album covers become the gallery.
   ========================================================= */

function CuratorArtwork({
                            tracks,
                            albumColors,
                        }: {
    tracks: JourneyTrack[];
    albumColors:
        Record<string, string>;
}) {
    return (
        <>
            <div
                className="
                    absolute
                    inset-[7%]
                    opacity-60
                    [background-image:linear-gradient(rgba(196,181,253,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(196,181,253,0.08)_1px,transparent_1px)]
                    [background-size:42px_42px]
                    [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]
                "
            />

            <AlbumCard
                track={tracks[0]}
                albumColors={
                    albumColors
                }
                rotate={-8}
                className="
                    left-[10%]
                    top-[22%]
                    h-[86px]
                    w-[86px]
                "
            />

            <AlbumCard
                track={tracks[1]}
                albumColors={
                    albumColors
                }
                rotate={5}
                delay={0.12}
                className="
                    right-[10%]
                    top-[30%]
                    h-[82px]
                    w-[82px]
                "
            />

            <AlbumCard
                track={tracks[2]}
                albumColors={
                    albumColors
                }
                rotate={-2}
                delay={0.22}
                className="
                    bottom-[4%]
                    left-[38%]
                    h-[96px]
                    w-[96px]
                "
            />
        </>
    );
}

/* =========================================================
   WILDCARD
   Mystery cards + real albums + shards.
   ========================================================= */

function WildcardArtwork({
                             tracks,
                             albumColors,
                         }: {
    tracks: JourneyTrack[];
    albumColors:
        Record<string, string>;
}) {
    return (
        <>
            <EnergyStreak
                left="2%"
                top="20%"
                rotate={-18}
                width={140}
            />

            <EnergyStreak
                left="64%"
                top="25%"
                rotate={21}
                width={130}
                delay={0.5}
            />

            <EnergyStreak
                left="13%"
                top="78%"
                rotate={13}
                width={100}
                delay={0.9}
            />

            <MysteryCard
                left="8%"
                top="23%"
                rotate={-9}
            />

            <MysteryCard
                right="7%"
                top="49%"
                rotate={7}
                delay={0.6}
            />

            <AlbumCard
                track={tracks[0]}
                albumColors={
                    albumColors
                }
                rotate={-6}
                className="
                    left-[27%]
                    top-[18%]
                    h-[80px]
                    w-[80px]
                "
            />

            <AlbumCard
                track={tracks[1]}
                albumColors={
                    albumColors
                }
                rotate={6}
                delay={0.12}
                className="
                    right-[22%]
                    top-[16%]
                    h-[68px]
                    w-[68px]
                "
            />

            <AlbumCard
                track={tracks[2]}
                albumColors={
                    albumColors
                }
                rotate={-3}
                delay={0.22}
                className="
                    bottom-[5%]
                    left-[42%]
                    h-[88px]
                    w-[88px]
                "
            />

            <motion.div
                animate={{
                    rotate: [
                        12,
                        28,
                        12,
                    ],
                    opacity: [
                        0.3,
                        0.8,
                        0.3,
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    bottom-[19%]
                    left-[12%]
                    h-3
                    w-3
                    border
                    border-cyan-200/45
                "
            />

            <motion.div
                animate={{
                    rotate: [
                        45,
                        25,
                        45,
                    ],
                    opacity: [
                        0.3,
                        0.75,
                        0.3,
                    ],
                }}
                transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    right-[12%]
                    top-[17%]
                    h-2.5
                    w-2.5
                    border
                    border-fuchsia-200/45
                "
            />
        </>
    );
}

/* =========================================================
   HELPERS
   ========================================================= */

function Waypoint({
                      left,
                      top,
                      delay = 0,
                  }: {
    left: string;
    top: string;
    delay?: number;
}) {
    return (
        <motion.div
            animate={{
                scale: [
                    1,
                    1.2,
                    1,
                ],
                opacity: [
                    0.45,
                    0.9,
                    0.45,
                ],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            style={{
                left,
                top,
            }}
            className="
                absolute
                flex
                h-3.5
                w-3.5
                items-center
                justify-center
                rounded-full
                border
                border-violet-200/30
            "
        >
            <span
                className="
                    h-1
                    w-1
                    rounded-full
                    bg-violet-200
                    shadow-[0_0_10px_rgba(196,181,253,0.8)]
                "
            />
        </motion.div>
    );
}

function MysteryCard({
                         left,
                         right,
                         top,
                         rotate,
                         delay = 0,
                     }: {
    left?: string;
    right?: string;
    top: string;
    rotate: number;
    delay?: number;
}) {
    return (
        <motion.div
            animate={{
                y: [
                    0,
                    -7,
                    0,
                ],
                rotate: [
                    rotate,
                    rotate + 3,
                    rotate,
                ],
                opacity: [
                    0.45,
                    0.85,
                    0.45,
                ],
            }}
            transition={{
                duration:
                    5.5 +
                    delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            style={{
                left,
                right,
                top,
            }}
            className="
                absolute
                flex
                h-[50px]
                w-[50px]
                items-center
                justify-center
                rounded-[14px]
                border
                border-fuchsia-300/[0.26]
                bg-gradient-to-br
                from-fuchsia-400/[0.11]
                via-violet-400/[0.07]
                to-cyan-400/[0.05]
                text-base
                font-light
                text-violet-100/65
                backdrop-blur-sm
            "
        >
            ?
        </motion.div>
    );
}

function EnergyStreak({
                          left,
                          top,
                          rotate,
                          width,
                          delay = 0,
                      }: {
    left: string;
    top: string;
    rotate: number;
    width: number;
    delay?: number;
}) {
    return (
        <motion.div
            animate={{
                x: [
                    0,
                    12,
                    0,
                ],
                scaleX: [
                    0.8,
                    1.12,
                    0.8,
                ],
                opacity: [
                    0.25,
                    0.75,
                    0.25,
                ],
            }}
            transition={{
                duration:
                    4 +
                    delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
            style={{
                left,
                top,
                width,
                rotate,
            }}
            className="
                absolute
                h-px
                bg-gradient-to-r
                from-transparent
                via-fuchsia-300/65
                to-cyan-300/20
            "
        />
    );
}