import type {
    JourneySummary,
} from "../types/discovery";
import {useJourneyAlbumColors} from "@/features/discovery/hooks/useJourneyAlbumColors.ts";

type JourneyCollectionCardProps = {
    journey: JourneySummary;
    onClick: () => void;
};


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

function formatPersona(
    persona: JourneySummary["discoveryPersona"],
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
}

export default function JourneyCollectionCard({
                                                  journey,
                                                  onClick,
                                              }: JourneyCollectionCardProps) {

    const previewTracks =
        (journey.trackPreviews ?? []).map(
            (track) => ({
                spotifyTrackId:
                track.spotifyTrackId,

                title: "",
                artist: "",

                albumImage:
                track.albumImage,
            }),
        );

    const albumColors =
        useJourneyAlbumColors(
            previewTracks,
        );

    const previewColors =
        Object.values(
            albumColors,
        );

    const primaryColor =
        previewColors[0] ??
        "#8B5CF6";


    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                relative
                min-h-[230px]
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.07]
                bg-[#0E1520]/75
                p-6
                text-left
                transition
                duration-300
                hover:-translate-y-1
                hover:border-violet-300/[0.18]
                hover:bg-[#111927]/90
            "
        >
            {/* Ambient persona glow */}

            <div
                aria-hidden="true"
                style={{
                    backgroundColor:
                    primaryColor,
                }}
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-10
                    h-[190px]
                    w-[190px]
                    rounded-full
                    opacity-[0.08]
                    blur-[70px]
                "
            />

            <div
                aria-hidden="true"
                className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
    "
            >
                {previewColors
                    .slice(0, 5)
                    .map(
                        (
                            color,
                            index,
                        ) => (
                            <span
                                key={`${color}-${index}`}
                                style={{
                                    backgroundColor:
                                    color,
                                    boxShadow:
                                        `0 0 22px ${color}`,
                                }}
                                className={`
                        absolute
                        rounded-full
                       

                        ${
                                    index === 0
                                        ? "right-[16%] top-[30%] h-2.5 w-2.5 opacity-70"
                                        : index === 1
                                            ? "right-[8%] top-[52%] h-1.5 w-1.5 opacity-55"
                                            : index === 2
                                                ? "right-[24%] top-[65%] h-1 w-1 opacity-45"
                                                : index === 3
                                                    ? "right-[34%] top-[42%] h-2 w-2 opacity-60"
                                                    : "right-[12%] top-[76%] h-1 w-1 opacity-40"
                                }
                    `}
                            />
                        ),
                    )}
            </div>



            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                "
            >
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
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.22em]
                            text-slate-600
                        "
                    >
                        {new Date(
                            `${journey.date}T00:00:00`,
                        ).toLocaleDateString(
                            undefined,
                            {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
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
                            text-[9px]
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

                <div className="mt-8">
                    <h3
                        className="
                            max-w-[240px]
                            text-2xl
                            font-semibold
                            tracking-[-0.045em]
                            text-white
                            transition
                            duration-300
                            group-hover:text-violet-100
                        "
                    >
                        {journey.journeyTitle}
                    </h3>

                    <p
                        className="
        mt-2
        max-w-[280px]
        text-xs
        leading-5
        text-slate-500
    "
                    >
                        {getJourneySubtitle(journey)}
                    </p>

                </div>

                <div
                    className="
                        mt-auto
                        grid
                        grid-cols-2
                        divide-x
                        divide-white/[0.06]
                        pt-8
                    "
                >
                    <div className="pr-4">
                        <p
                            className="
                                text-xl
                                font-semibold
                                text-white
                            "
                        >
                            {Math.round(
                                journey.likeRate,
                            )}
                            %
                        </p>

                        <p
                            className="
                                mt-1
                                text-[9px]
                                uppercase
                                tracking-[0.16em]
                                text-slate-600
                            "
                        >
                            Hit rate
                        </p>
                    </div>

                    <div className="pl-4">
                        <p
                            className="
                                text-xl
                                font-semibold
                                text-white
                            "
                        >
                            {Math.round(
                                journey.averageAdventureLevel,
                            )}
                            %
                        </p>

                        <p
                            className="
                                mt-1
                                text-[9px]
                                uppercase
                                tracking-[0.16em]
                                text-slate-600
                            "
                        >
                            Adventure
                        </p>
                    </div>
                </div>
            </div>
        </button>
    );
}