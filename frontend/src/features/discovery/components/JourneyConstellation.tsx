import { motion } from "framer-motion";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";

type JourneyConstellationProps = {
    recap: DailyDiscoveryRecap;
    albumColors: Record<string, string>;
};

const NODE_COUNT = 20;

export default function JourneyConstellation({
                                                 recap,
                                                 albumColors,
                                             }: JourneyConstellationProps) {
    const spread =
        65 +
        recap.averageAdventureLevel * 1.05;

    const blindRatio =
        recap.explored === 0
            ? 0
            : recap.blindExplored /
            recap.explored;

    const palette =
        Object.values(albumColors);

    const primaryColor =
        palette[0] ??
        "#A78BFA";

    const nodes =
        Array.from(
            {
                length: NODE_COUNT,
            },
            (_, index) => {
                const angle =
                    (index / NODE_COUNT) *
                    Math.PI *
                    2 +
                    index * 0.37;

                /*
                 * Different radius per node so
                 * the constellation doesn't look
                 * like a perfect circle.
                 */
                const radiusFactor =
                    0.38 +
                    ((index * 17) % 61) /
                    100;

                const radius =
                    spread * radiusFactor;

                let x =
                    Math.cos(angle) *
                    radius;

                let y =
                    Math.sin(angle) *
                    radius *
                    0.62;

                const exclusionHalfWidth = 110;
                const exclusionHalfHeight = 46;

                const insideExclusionZone =
                    Math.abs(x) <
                    exclusionHalfWidth &&
                    Math.abs(y) <
                    exclusionHalfHeight;

                if (insideExclusionZone) {
                    const pushFactor =
                        1.55 +
                        (index % 4) * 0.08;

                    x *= pushFactor;
                    y *= pushFactor;
                }

                x = Math.max(
                    -155,
                    Math.min(155, x),
                );

                y = Math.max(
                    -100,
                    Math.min(100, y),
                );

                const blind =
                    index <
                    Math.round(
                        NODE_COUNT *
                        blindRatio,
                    );

                const track =
                    recap.tracks[index];

                const color =
                    track
                        ? albumColors[
                        track.spotifyTrackId
                        ] ?? "#A78BFA"
                        : "#A78BFA";

                return {
                    index,
                    x,
                    y,
                    blind,
                    color,
                };
            },
        );

    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[250px]
                w-[340px]
                -translate-x-1/2
                -translate-y-1/2
            "
        >
            {/* Comfort-zone core */}

            <motion.div
                animate={{
                    scale: [
                        1,
                        1.06,
                        1,
                    ],
                    opacity: [
                        0.2,
                        0.42,
                        0.2,
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
                    top-1/2
                    h-[72px]
                    w-[120px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-violet-300/[0.08]
                "
            />

            {/* Central origin */}

            <motion.div
                animate={{
                    scale: [
                        1,
                        1.4,
                        1,
                    ],
                    opacity: [
                        0.5,
                        1,
                        0.5,
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    backgroundColor:
                    primaryColor,
                    boxShadow:
                        `0 0 22px ${primaryColor}`,
                }}
                className="
                    absolute
                    left-1/2
                    top-1/2
                    h-1.5
                    w-1.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rotate-45
                "
            />

            {/* Discovery nodes */}

            {nodes.map(
                ({
                     index,
                     x,
                     y,
                     blind,
                     color,
                 }) => (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                        }}
                        animate={{
                            opacity:
                                blind
                                    ? 0.95
                                    : 0.78,
                            scale: 1,
                            x,
                            y,
                        }}
                        transition={{
                            delay:
                                index *
                                0.025,
                            duration: 0.7,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            flex
                            h-3
                            w-3
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                        "
                    >
                        {/* Blind-mode halo */}

                        {blind && (
                            <motion.span
                                animate={{
                                    scale: [
                                        1,
                                        1.35,
                                        1,
                                    ],
                                    opacity: [
                                        0.25,
                                        0.7,
                                        0.25,
                                    ],
                                }}
                                transition={{
                                    duration:
                                        2.8 +
                                        (index %
                                            3) *
                                        0.5,
                                    repeat:
                                    Infinity,
                                    ease:
                                        "easeInOut",
                                }}
                                style={{
                                    borderColor:
                                    color,
                                    boxShadow:
                                        `0 0 10px ${color}`,
                                }}
                                className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    border
                                    opacity-40
                                "
                            />
                        )}

                        {/* Album-color node */}

                        <span
                            style={{
                                backgroundColor:
                                color,
                                color,
                                boxShadow:
                                    index % 5 === 0
                                        ? `0 0 22px ${color}`
                                        : `0 0 14px ${color}`,
                            }}
                            className={`
    block
    rounded-full

    ${
                                index % 5 === 0
                                    ? "h-2.5 w-2.5"
                                    : index % 3 === 0
                                        ? "h-2 w-2"
                                        : "h-1.5 w-1.5"
                            }
`}
                        />
                    </motion.div>
                ),
            )}
        </div>
    );
}