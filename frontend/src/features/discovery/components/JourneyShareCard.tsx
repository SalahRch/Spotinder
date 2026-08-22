import type {
    DailyDiscoveryRecap,
} from "../types/discovery";

import {
    useJourneyAlbumColors,
} from "@/features/discovery/hooks/useJourneyAlbumColors";

import {
    pickJourneyAuraColors,
} from "@/features/discovery/utils/journeyPalette";

import JourneyShareArtwork
    from "./JourneyShareArtwork";
import {forwardRef} from "react";

type JourneyShareCardProps = {
    recap: DailyDiscoveryRecap;
};

function formatPersona(
    persona:
    DailyDiscoveryRecap["discoveryPersona"],
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

const JourneyShareCard =
    forwardRef<
        HTMLDivElement,
        JourneyShareCardProps
    >(
        (
            {
                recap,
            },
            ref,
        ) => {
    const albumColors =
        useJourneyAlbumColors(
            recap.tracks ?? [],
        );

    const likedTracks =
        recap.tracks.filter(
            (track) =>
                track.direction ===
                "RIGHT",
        );

    const posterTracks =
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

    const posterColors =
        posterTracks
            .map(
                (track) =>
                    albumColors[
                        track.spotifyTrackId
                        ],
            )
            .filter(
                (
                    color,
                ): color is string =>
                    Boolean(color),
            );

    const [
        primaryAura,
        secondaryAura,
    ] = pickJourneyAuraColors(
        posterColors,
    );


    return (
        <div
            ref={ref}
            className="
                relative
                aspect-[4/5]
                w-[390px]
                max-w-full
                overflow-hidden
                rounded-[34px]
                border
                border-white/[0.09]
                bg-[#070C14]
                shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            "
        >
            {/* ================= ALBUM AURAS ================= */}

            <div
                aria-hidden="true"
                style={{
                    backgroundColor:
                    primaryAura,
                }}
                className="
                    pointer-events-none
                    absolute
                    -left-28
                    top-12
                    h-[330px]
                    w-[330px]
                    rounded-full
                    opacity-[0.18]
                    blur-[120px]
                "
            />

            <div
                aria-hidden="true"
                style={{
                    backgroundColor:
                    secondaryAura,
                }}
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    bottom-10
                    h-[320px]
                    w-[320px]
                    rounded-full
                    opacity-[0.15]
                    blur-[120px]
                "
            />

            {/* subtle grain/grid */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.16]
                    [background-image:radial-gradient(rgba(255,255,255,0.10)_0.6px,transparent_0.6px)]
                    [background-size:14px_14px]
                    [mask-image:linear-gradient(to_bottom,black,transparent_88%)]
                "
            />

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    px-7
                    py-7
                "
            >
                {/* ================= BRAND ================= */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.36em]
                                text-violet-300
                            "
                        >
                            Spotinder
                        </p>

                        <p
                            className="
                                mt-1
                                text-[8px]
                                uppercase
                                tracking-[0.2em]
                                text-slate-600
                            "
                        >
                            Discovery Journey
                        </p>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-[8px]
                            uppercase
                            tracking-[0.18em]
                            text-slate-600
                        "
                    >
                        <span>
                            {new Date(
                                `${recap.date}T00:00:00`,
                            ).toLocaleDateString(
                                undefined,
                                {
                                    month:
                                        "short",
                                    day:
                                        "numeric",
                                },
                            )}
                        </span>

                        <span
                            className="
                                h-1
                                w-1
                                rotate-45
                                bg-violet-300/70
                            "
                        />
                    </div>
                </div>

                {/* ================= TITLE ================= */}

                <div
                    className="
                        mt-7
                        text-center
                    "
                >
                    <h2
                        className="
                            bg-gradient-to-r
                            from-cyan-100
                            via-white
                            to-violet-200
                            bg-clip-text
                            text-[38px]
                            font-semibold
                            leading-[0.98]
                            tracking-[-0.06em]
                            text-transparent
                        "
                    >
                        {
                            recap.journeyTitle
                        }
                    </h2>

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                h-1
                                w-1
                                rotate-45
                                bg-violet-300
                                shadow-[0_0_10px_rgba(196,181,253,0.8)]
                            "
                        />

                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.28em]
                                text-violet-200/80
                            "
                        >
                            The{" "}
                            {formatPersona(
                                recap.discoveryPersona,
                            )}
                        </p>
                    </div>
                </div>

                {/* ================= POSTER ART ================= */}

                <div
                    className="
                        -mx-4
                        mt-2
                    "
                >
                    <JourneyShareArtwork
                        recap={recap}
                        albumColors={
                            albumColors
                        }
                    />
                </div>

                {/* ================= RECAP QUOTE ================= */}

                <p
                    className="
                        mx-auto
                        -mt-1
                        max-w-[300px]
                        text-center
                        text-[12px]
                        leading-5
                        text-slate-300
                    "
                >
                    “{
                    recap.recapMessage
                }”
                </p>

                {/* ================= STATS ================= */}

                <div
                    className="
                        mt-5
                        grid
                        grid-cols-3
                        divide-x
                        divide-white/[0.07]
                    "
                >
                    <PosterStat
                        value={
                            recap.explored
                        }
                        label="Explored"
                    />

                    <PosterStat
                        value={
                            recap.liked
                        }
                        label="Liked"
                    />

                    <PosterStat
                        value={`${Math.round(
                            recap.likeRate,
                        )}%`}
                        label="Hit"
                    />
                </div>

                {/* ================= ADVENTURE ================= */}

                <div
                    className="
                        mt-5
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                        "
                    >
                        <span
                            className="
                                text-cyan-200/60
                            "
                        >
                            Adventure
                        </span>

                        <span
                            className="
                                text-slate-300
                            "
                        >
                            {Math.round(
                                recap.averageAdventureLevel,
                            )}
                        </span>
                    </div>

                    <div
                        className="
                            mt-2
                            h-px
                            overflow-hidden
                            bg-white/[0.08]
                        "
                    >
                        <div
                            style={{
                                width:
                                    `${Math.min(
                                        recap.averageAdventureLevel,
                                        100,
                                    )}%`,
                            }}
                            className="
                                h-full
                                bg-gradient-to-r
                                from-cyan-300
                                via-violet-300
                                to-fuchsia-300
                            "
                        />
                    </div>
                </div>

                {/* ================= FOOTER ================= */}

                <div
                    className="
                        mt-auto
                        flex
                        items-center
                        justify-between
                        pt-5
                    "
                >
                    <p
                        className="
                            text-[8px]
                            uppercase
                            tracking-[0.2em]
                            text-slate-700
                        "
                    >
                        Your taste.
                        Your journey.
                    </p>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-violet-300/70
                            "
                        >
                            Spotinder
                        </span>

                        <span
                            className="
                                h-1.5
                                w-1.5
                                rotate-45
                                border
                                border-violet-300/60
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

JourneyShareCard.displayName= "JourneyShareCard";

export default JourneyShareCard;

type PosterStatProps = {
    value: string | number;
    label: string;
};

function PosterStat({
                        value,
                        label,
                    }: PosterStatProps) {
    return (
        <div
            className="
                text-center
            "
        >
            <p
                className="
                    text-lg
                    font-semibold
                    tracking-[-0.04em]
                    text-white
                "
            >
                {value}
            </p>

            <p
                className="
                    mt-1
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-slate-600
                "
            >
                {label}
            </p>
        </div>
    );
}