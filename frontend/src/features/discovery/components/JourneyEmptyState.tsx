import {
    FiArrowLeft,
} from "react-icons/fi";

import type {
    JourneySummary,
} from "../types/discovery";

type Persona =
    JourneySummary["discoveryPersona"];

type JourneyEmptyStateProps = {
    persona?: Persona;
    onClear: () => void;
};

const copy: Record<
    Persona,
    {
        title: string;
        description: string;
    }
> = {
    EXPLORER: {
        title:
            "No Explorer journeys yet.",
        description:
            "This path hasn't been traveled yet.",
    },

    ROMANTIC: {
        title:
            "No Romantic journeys yet.",
        description:
            "Your archive hasn't captured this side of your taste yet.",
    },

    PURIST: {
        title:
            "No Purist journeys yet.",
        description:
            "No journey has stayed this close to your musical core yet.",
    },

    CURATOR: {
        title:
            "No Curator journeys yet.",
        description:
            "Your archive is still waiting for a carefully chosen trail.",
    },

    WANDERER: {
        title:
            "No Wanderer journeys yet.",
        description:
            "No drifting path has made it into your archive yet.",
    },

    WILDCARD: {
        title:
            "No Wildcard journeys yet.",
        description:
            "No chaos has made it into your archive... yet.",
    },
};

export default function JourneyEmptyState({
                                              persona,
                                              onClear,
                                          }: JourneyEmptyStateProps) {
    const content =
        persona
            ? copy[persona]
            : {
                title:
                    "No journeys found.",
                description:
                    "Nothing in your archive matches these filters.",
            };

    return (
        <div
            className="
                flex
                min-h-[300px]
                items-center
                justify-center
                px-6
                py-16
            "
        >
            <div
                className="
                    flex
                    max-w-md
                    flex-col
                    items-center
                    text-center
                "
            >
                {/* archive trace */}

                <div
                    aria-hidden="true"
                    className="
                        relative
                        mb-7
                        h-14
                        w-24
                    "
                >
                    <div
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[42px]
                            w-[42px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-violet-300/[0.10]
                        "
                    />

                    <div
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-[22px]
                            w-[22px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-cyan-300/[0.08]
                        "
                    />

                    <div
                        className="
                            absolute
                            left-[8px]
                            top-1/2
                            h-px
                            w-[32px]
                            -translate-y-1/2
                            bg-gradient-to-r
                            from-transparent
                            to-violet-300/[0.14]
                        "
                    />

                    <div
                        className="
                            absolute
                            right-[8px]
                            top-1/2
                            h-px
                            w-[32px]
                            -translate-y-1/2
                            bg-gradient-to-l
                            from-transparent
                            to-cyan-300/[0.12]
                        "
                    />

                    <div
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-1.5
                            w-1.5
                            -translate-x-1/2
                            -translate-y-1/2
                            rotate-45
                            bg-violet-300/50
                            shadow-[0_0_14px_rgba(196,181,253,0.25)]
                        "
                    />
                </div>

                <p
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.24em]
                        text-violet-300/55
                    "
                >
                    No trace found
                </p>

                <h3
                    className="
                        mt-3
                        text-xl
                        font-semibold
                        tracking-[-0.03em]
                        text-slate-200
                    "
                >
                    {content.title}
                </h3>

                <p
                    className="
                        mt-2
                        max-w-sm
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    {content.description}
                </p>

                <button
                    type="button"
                    onClick={onClear}
                    className="
                        group
                        mt-6
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-medium
                        text-violet-300
                        transition
                        hover:text-violet-200
                    "
                >
                    <FiArrowLeft
                        className="
                            transition-transform
                            group-hover:-translate-x-1
                        "
                    />

                    Clear filters
                </button>
            </div>
        </div>
    );
}