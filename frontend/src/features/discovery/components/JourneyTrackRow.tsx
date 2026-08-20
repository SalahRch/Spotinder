import {
    FiEyeOff,
    FiHeart,
    FiX,
} from "react-icons/fi";

import type {
    JourneyTrack,
} from "@/features/discovery/types/discovery";

type JourneyTrackRowProps = {
    track: JourneyTrack;
    index: number;
    isLast: boolean;
};

export default function JourneyTrackRow({
                                            track,
                                            index,
                                            isLast,
                                        }: JourneyTrackRowProps) {
    const liked =
        track.direction ===
        "RIGHT";

    return (
        <div
            className={`
                group
                grid
                grid-cols-[30px_52px_minmax(0,1fr)]
                items-center
                gap-4
                px-5
                py-3.5
                transition
                duration-200
                hover:bg-white/[0.025]
                md:grid-cols-[38px_54px_minmax(0,1fr)_auto]

                ${
                !isLast
                    ? "border-b border-white/[0.045]"
                    : ""
            }
            `}
        >
            {/* Sequence */}

            <span
                className="
                    text-[9px]
                    font-medium
                    tabular-nums
                    text-slate-700
                "
            >
                {String(
                    index + 1,
                ).padStart(
                    2,
                    "0",
                )}
            </span>

            {/* Artwork */}

            <div
                className="
                    h-[52px]
                    w-[52px]
                    overflow-hidden
                    rounded-[13px]
                    border
                    border-white/[0.06]
                    bg-white/[0.03]
                    transition
                    duration-300
                    group-hover:scale-[1.03]
                    group-hover:border-white/[0.10]
                "
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
                            from-violet-500/15
                            to-cyan-500/10
                        "
                    />
                )}
            </div>

            {/* Song */}

            <div
                className="
                    min-w-0
                "
            >
                <p
                    className="
                        truncate
                        text-sm
                        font-medium
                        text-slate-100
                        transition
                        group-hover:text-white
                    "
                >
                    {track.title}
                </p>

                <p
                    className="
                        mt-1
                        truncate
                        text-xs
                        text-slate-500
                    "
                >
                    {track.artist}
                </p>

                {/* Mobile metadata */}

                <div
                    className="
                        mt-2
                        flex
                        flex-wrap
                        gap-1.5
                        md:hidden
                    "
                >
                    <StatusPill
                        liked={
                            liked
                        }
                    />

                    {track.blindMode && (
                        <BlindPill />
                    )}

                    <AdventurePill
                        value={
                            track.adventureLevel
                        }
                    />
                </div>
            </div>

            {/* Desktop metadata */}

            <div
                className="
                    hidden
                    items-center
                    gap-2
                    md:flex
                "
            >
                <StatusPill
                    liked={
                        liked
                    }
                />

                {track.blindMode && (
                    <BlindPill />
                )}

                <AdventurePill
                    value={
                        track.adventureLevel
                    }
                />
            </div>
        </div>
    );
}

function StatusPill({
                        liked,
                    }: {
    liked: boolean;
}) {
    return (
        <span
            className={`
                flex
                items-center
                gap-1.5
                rounded-full
                border
                px-2.5
                py-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.13em]

                ${
                liked
                    ? `
                            border-emerald-300/[0.12]
                            bg-emerald-300/[0.045]
                            text-emerald-300/75
                        `
                    : `
                            border-white/[0.055]
                            bg-white/[0.018]
                            text-slate-600
                        `
            }
            `}
        >
            {liked ? (
                <FiHeart />
            ) : (
                <FiX />
            )}

            {liked
                ? "Liked"
                : "Passed"}
        </span>
    );
}

function BlindPill() {
    return (
        <span
            className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-violet-300/[0.09]
                bg-violet-300/[0.035]
                px-2.5
                py-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-violet-300/65
            "
        >
            <FiEyeOff />

            Blind
        </span>
    );
}

function AdventurePill({
                           value,
                       }: {
    value: number;
}) {
    return (
        <span
            className="
                rounded-full
                border
                border-cyan-300/[0.07]
                bg-cyan-300/[0.025]
                px-2.5
                py-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-cyan-300/60
            "
        >
            {Math.round(
                value,
            )}
            % adventure
        </span>
    );
}