import {
    FiArrowUpRight,
} from "react-icons/fi";

import type {
    JourneySummary,
} from "../types/discovery";

import {
    useJourneyAlbumColors,
} from "@/features/discovery/hooks/useJourneyAlbumColors";

type JourneyCollectionCardProps = {
    journey: JourneySummary;
    onClick: () => void;
};

function getJourneyVariant(
    journeyId: string,
) {
    return (
        journeyId
            .split("")
            .reduce(
                (sum, char) =>
                    sum +
                    char.charCodeAt(0),
                0,
            ) % 3
    );
}

function formatPersona(
    persona:
    JourneySummary["discoveryPersona"],
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(
            /\b\w/g,
            (letter) =>
                letter.toUpperCase(),
        );
}

function getJourneySubtitle(
    journey: JourneySummary,
) {
    if (
        journey.likeRate >= 90 &&
        journey.averageAdventureLevel >= 80
    ) {
        return "Bold taste. Almost no hesitation.";
    }

    if (
        journey.likeRate >= 90 &&
        journey.averageAdventureLevel < 50
    ) {
        return "Familiar territory, perfect instincts.";
    }

    if (
        journey.likeRate < 60 &&
        journey.averageAdventureLevel >= 80
    ) {
        return "You wandered far and stayed selective.";
    }

    if (
        journey.averageAdventureLevel >= 70
    ) {
        return "A high-adventure discovery run.";
    }

    if (
        journey.likeRate >= 80
    ) {
        return "A day full of strong matches.";
    }

    return "A snapshot of how your taste moved.";
}

export default function JourneyCollectionCard({
                                                  journey,
                                                  onClick,
                                              }: JourneyCollectionCardProps) {
    const previewTracks =
        journey.trackPreviews ?? [];

    const albumColors =
        useJourneyAlbumColors(
            previewTracks,
        );

    const previewColors =
        Object.values(
            albumColors,
        );

    const motifVariant =
        getJourneyVariant(
            journey.id,
        );

    const primaryColor =
        previewColors[0] ??
        "#8B5CF6";

    const covers =
        previewTracks
            .filter(
                (track) =>
                    Boolean(
                        track.albumImage,
                    ),
            )
            .slice(
                0,
                3,
            );

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                relative
                min-h-[320px]
                overflow-hidden
                rounded-[30px]
                border
                border-white/[0.07]
                bg-[#0D141F]/80
                p-6
                text-left
                transition
                duration-300
                hover:-translate-y-1
                hover:border-violet-300/[0.16]
                hover:bg-[#101824]/95
            "
        >
            {/* album-derived ambient glow */}

            <div
                aria-hidden="true"
                style={{
                    backgroundColor:
                    primaryColor,
                }}
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-20
                    h-[280px]
                    w-[280px]
                    rounded-full
                    opacity-[0.10]
                    blur-[100px]
                    transition
                    duration-500
                    group-hover:opacity-[0.16]
                "
            />

            {/* compact persona signature */}

            <PersonaMiniMotif
                persona={
                    journey.discoveryPersona
                }
                variant={
                    motifVariant
                }
            />

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                "
            >
                {/* top */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    <p
                        className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.20em]
                            text-slate-600
                        "
                    >
                        {new Date(
                            `${journey.date}T00:00:00`,
                        ).toLocaleDateString(
                            undefined,
                            {
                                weekday:
                                    "short",
                                month:
                                    "short",
                                day:
                                    "numeric",
                            },
                        )}
                    </p>

                    <span
                        className="
                            rounded-full
                            border
                            border-violet-300/[0.10]
                            bg-violet-300/[0.04]
                            px-3
                            py-1
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-violet-300/70
                        "
                    >
                        The{" "}
                        {formatPersona(
                            journey.discoveryPersona,
                        )}
                    </span>
                </div>

                {/* title */}

                <div
                    className="
                        mt-7
                        pr-24
                    "
                >
                    <h3
                        className="
                            text-2xl
                            font-semibold
                            tracking-[-0.045em]
                            text-white
                            transition
                            duration-300
                            group-hover:text-violet-100
                        "
                    >
                        {
                            journey.journeyTitle
                        }
                    </h3>

                    <p
                        className="
                            mt-2
                            max-w-[260px]
                            text-xs
                            leading-5
                            text-slate-500
                        "
                    >
                        {
                            getJourneySubtitle(
                                journey,
                            )
                        }
                    </p>
                </div>

                {/* album memories */}

                <div
                    className="
                        relative
                        mt-6
                        h-[88px]
                    "
                >
                    {covers.map(
                        (
                            track,
                            index,
                        ) => (
                            <div
                                key={
                                    track.spotifyTrackId
                                }
                                style={{
                                    left:
                                        index *
                                        42,

                                    transform:
                                        `rotate(${
                                            index ===
                                            0
                                                ? -7
                                                : index ===
                                                1
                                                    ? 3
                                                    : 8
                                        }deg)`,
                                }}
                                className="
                                    absolute
                                    top-[42%]
                                    h-[64px]
                                    w-[64px]
                                    -translate-y-1/2
                                    overflow-hidden
                                    rounded-[15px]
                                    border
                                    border-white/[0.10]
                                    bg-[#111827]
                                    shadow-[0_12px_30px_rgba(0,0,0,0.28)]
                                    transition
                                    duration-300
                                    group-hover:-translate-y-[58%]
                                "
                            >
                                <img
                                    src={
                                        track.albumImage!
                                    }
                                    alt=""
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />
                            </div>
                        ),
                    )}

                    <div
                        className="
                            absolute
                            bottom-1
                            right-1
                            flex
                            items-center
                            gap-2
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.14em]
                            text-slate-500
                            transition
                            duration-300
                            group-hover:text-violet-300
                        "
                    >
                        View journey

                        <FiArrowUpRight
                            className="
                                transition-transform
                                duration-300
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                            "
                        />
                    </div>
                </div>

                {/* metrics */}

                <div
                    className="
                        mt-auto
                        flex
                        items-center
                        gap-5
                        border-t
                        border-white/[0.05]
                        pt-6
                    "
                >
                    <Metric
                        value={`${Math.round(
                            journey.likeRate,
                        )}%`}
                        label="Hit"
                    />

                    <span
                        className="
                            h-5
                            w-px
                            bg-white/[0.06]
                        "
                    />

                    <Metric
                        value={`${Math.round(
                            journey.averageAdventureLevel,
                        )}%`}
                        label="Adventure"
                    />
                </div>
            </div>
        </button>
    );
}

function Metric({
                    value,
                    label,
                }: {
    value: string;
    label: string;
}) {
    return (
        <div
            className="
                flex
                items-baseline
                gap-1.5
            "
        >
            <span
                className="
                    text-sm
                    font-semibold
                    text-slate-200
                "
            >
                {value}
            </span>

            <span
                className="
                    text-[8px]
                    uppercase
                    tracking-[0.13em]
                    text-slate-700
                "
            >
                {label}
            </span>
        </div>
    );
}

function PersonaMiniMotif({
                              persona,
                              variant,
                          }: {
    persona:
        JourneySummary["discoveryPersona"];

    variant: number;
}) {
    /* =====================================================
       EXPLORER
       ===================================================== */

    if (
        persona ===
        "EXPLORER"
    ) {
        const position =
            variant === 0
                ? "-right-14 top-[72px]"
                : variant === 1
                    ? "-right-8 top-[96px]"
                    : "-right-20 top-[48px]";

        return (
            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute
                    h-[170px]
                    w-[170px]

                    ${position}
                `}
            >
                {[0, 1, 2].map(
                    (index) => (
                        <div
                            key={
                                index
                            }
                            style={{
                                inset:
                                    index *
                                    28,
                            }}
                            className="
                                absolute
                                rounded-full
                                border
                                border-cyan-300/[0.08]
                            "
                        />
                    ),
                )}

                <div
                    className={`
                        absolute
                        left-1/2
                        top-1/2
                        h-px
                        w-[42%]
                        origin-left
                        bg-gradient-to-r
                        from-cyan-200/15
                        to-transparent

                        ${
                        variant === 0
                            ? "rotate-[15deg]"
                            : variant === 1
                                ? "rotate-[-18deg]"
                                : "rotate-[34deg]"
                    }
                    `}
                />
            </div>
        );
    }

    /* =====================================================
       ROMANTIC
       ===================================================== */

    if (
        persona ===
        "ROMANTIC"
    ) {
        const position =
            variant === 0
                ? "-right-12 top-16"
                : variant === 1
                    ? "-right-6 top-[88px]"
                    : "-right-20 top-[54px]";

        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 300 220"
                fill="none"
                className={`
                    pointer-events-none
                    absolute
                    h-[190px]
                    w-[250px]
                    opacity-50

                    ${position}
                `}
            >
                <path
                    d={
                        variant === 0
                            ? "M0 55 C80 5 110 180 300 85"
                            : variant === 1
                                ? "M0 75 C90 20 130 165 300 65"
                                : "M0 45 C70 160 170 10 300 105"
                    }
                    stroke="rgba(244,114,182,0.22)"
                />

                <path
                    d={
                        variant === 0
                            ? "M0 170 C95 215 150 30 300 145"
                            : variant === 1
                                ? "M0 155 C110 205 160 40 300 160"
                                : "M0 180 C85 50 190 205 300 125"
                    }
                    stroke="rgba(196,181,253,0.18)"
                />
            </svg>
        );
    }

    /* =====================================================
       PURIST
       ===================================================== */

    if (
        persona ===
        "PURIST"
    ) {
        const bars =
            variant === 0
                ? [
                    14,
                    26,
                    42,
                    60,
                    42,
                    26,
                    14,
                ]
                : variant === 1
                    ? [
                        18,
                        32,
                        52,
                        32,
                        18,
                    ]
                    : [
                        12,
                        22,
                        36,
                        56,
                        70,
                        56,
                        36,
                        22,
                        12,
                    ];

        const position =
            variant === 0
                ? "right-7 top-[110px]"
                : variant === 1
                    ? "right-10 top-[92px]"
                    : "right-4 top-[124px]";

        return (
            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute
                    flex
                    items-center
                    gap-1
                    opacity-30

                    ${position}
                `}
            >
                {bars.map(
                    (
                        height,
                        index,
                    ) => (
                        <span
                            key={
                                index
                            }
                            style={{
                                height,
                            }}
                            className="
                                w-px
                                bg-cyan-200
                            "
                        />
                    ),
                )}
            </div>
        );
    }

    /* =====================================================
       CURATOR
       ===================================================== */

    if (
        persona ===
        "CURATOR"
    ) {
        const position =
            variant === 0
                ? "-right-8 top-[70px]"
                : variant === 1
                    ? "-right-2 top-[92px]"
                    : "-right-14 top-[52px]";

        const gridSize =
            variant === 0
                ? "34px"
                : variant === 1
                    ? "28px"
                    : "40px";

        return (
            <div
                aria-hidden="true"
                style={{
                    backgroundSize:
                        `${gridSize} ${gridSize}`,
                }}
                className={`
                    pointer-events-none
                    absolute
                    h-[180px]
                    w-[180px]
                    opacity-30
                    [background-image:linear-gradient(rgba(196,181,253,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(196,181,253,0.12)_1px,transparent_1px)]
                    [mask-image:radial-gradient(circle,black,transparent_72%)]

                    ${position}
                `}
            />
        );
    }

    /* =====================================================
       WANDERER
       ===================================================== */

    if (
        persona ===
        "WANDERER"
    ) {
        const position =
            variant === 0
                ? "-right-10 top-[80px]"
                : variant === 1
                    ? "-right-4 top-[98px]"
                    : "-right-16 top-[58px]";

        const path =
            variant === 0
                ? `
                    M 0 125
                    C 60 80,
                      70 30,
                      130 55
                    C 190 80,
                      185 145,
                      320 70
                `
                : variant === 1
                    ? `
                    M 0 70
                    C 60 135,
                      120 10,
                      170 65
                    C 220 120,
                      260 150,
                      320 95
                `
                    : `
                    M 0 145
                    C 95 150,
                      70 35,
                      150 40
                    C 230 45,
                      215 130,
                      320 60
                `;

        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 320 180"
                fill="none"
                className={`
                    pointer-events-none
                    absolute
                    h-[170px]
                    w-[260px]
                    opacity-40

                    ${position}
                `}
            >
                <path
                    d={path}
                    stroke="rgba(196,181,253,0.25)"
                    strokeDasharray="5 8"
                />
            </svg>
        );
    }

    /* =====================================================
       WILDCARD
       ===================================================== */

    const wildcardPosition =
        variant === 0
            ? "right-7 top-[105px] rotate-12"
            : variant === 1
                ? "right-12 top-[82px] -rotate-6"
                : "right-4 top-[125px] rotate-[22deg]";

    return (
        <>
            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute
                    h-[90px]
                    w-[90px]
                    border
                    border-fuchsia-300/[0.10]

                    ${wildcardPosition}
                `}
            >
                <span
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        text-xl
                        text-violet-200/15
                    "
                >
                    ?
                </span>
            </div>

            {variant !== 0 && (
                <div
                    aria-hidden="true"
                    className={`
                        pointer-events-none
                        absolute
                        h-3
                        w-3
                        rotate-45
                        border
                        border-cyan-200/[0.12]

                        ${
                        variant === 1
                            ? "right-[30%] top-[48%]"
                            : "right-[18%] top-[34%]"
                    }
                    `}
                />
            )}
        </>
    );
}