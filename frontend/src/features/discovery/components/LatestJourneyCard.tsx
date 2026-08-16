// LatestJourneyCard.tsx

import {
    FiArrowUpRight,
} from "react-icons/fi";

import type {
    JourneySummary,
} from "../types/discovery";

type LatestJourneyCardProps = {
    journey: JourneySummary;
    onClick: () => void;
};

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

export default function LatestJourneyCard({
                                              journey,
                                              onClick,
                                          }: LatestJourneyCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                group
                relative
                w-full
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.07]
                bg-[#0E1520]/80
                p-7
                text-left
                transition
                duration-300
                hover:-translate-y-1
                hover:border-violet-300/[0.16]
                hover:bg-[#111927]/90
                lg:p-8
            "
        >
            {/* subtle visual field */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-[320px]
                    w-[320px]
                    rounded-full
                    bg-violet-500/[0.09]
                    blur-[110px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[8%]
                    top-1/2
                    h-[180px]
                    w-[360px]
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-violet-300/[0.05]
                "
            />

            <div
                className="
                    relative
                    z-10
                    grid
                    gap-8
                    lg:grid-cols-[1.2fr_0.8fr]
                    lg:items-end
                "
            >
                <div>
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >
                        <span
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-violet-300/70
                            "
                        >
                            Latest Journey
                        </span>

                        <span
                            className="
                                h-1
                                w-1
                                rounded-full
                                bg-slate-700
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-slate-600
                            "
                        >
                            {new Date(
                                `${journey.date}T00:00:00`,
                            ).toLocaleDateString(
                                undefined,
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        </span>
                    </div>

                    <h3
                        className="
                            mt-6
                            max-w-xl
                            text-3xl
                            font-semibold
                            tracking-[-0.05em]
                            text-white
                            transition
                            group-hover:text-violet-100
                            lg:text-4xl
                        "
                    >
                        {journey.journeyTitle}
                    </h3>

                    <p
                        className="
                            mt-3
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.22em]
                            text-violet-200/75
                        "
                    >
                        The{" "}
                        {formatPersona(
                            journey.discoveryPersona,
                        )}
                    </p>

                    <p
                        className="
                            mt-5
                            max-w-lg
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        Revisit your latest discovery session
                        and the listening personality it created.
                    </p>
                </div>

                <div>
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-4
                        "
                    >
                        <Metric
                            value={`${Math.round(
                                journey.likeRate,
                            )}%`}
                            label="Hit rate"
                        />

                        <Metric
                            value={`${Math.round(
                                journey.averageAdventureLevel,
                            )}%`}
                            label="Adventure"
                        />
                    </div>

                    <div
                        className="
                            mt-6
                            flex
                            items-center
                            justify-end
                            gap-2
                            text-xs
                            font-medium
                            text-slate-400
                            transition
                            group-hover:text-violet-200
                        "
                    >
                        View journey
                        <FiArrowUpRight />
                    </div>
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
                rounded-[20px]
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-4
            "
        >
            <p
                className="
                    text-2xl
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
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-slate-600
                "
            >
                {label}
            </p>
        </div>
    );
}