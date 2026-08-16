import type {
    JourneySummary,
} from "../types/discovery";

type JourneyCollectionCardProps = {
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

export default function JourneyCollectionCard({
                                                  journey,
                                                  onClick,
                                              }: JourneyCollectionCardProps) {
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
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-[220px]
                    w-[220px]
                    rounded-full
                    bg-violet-500/[0.08]
                    blur-[80px]
                    transition
                    duration-500
                    group-hover:bg-violet-500/[0.13]
                "
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
                            text-xs
                            uppercase
                            tracking-[0.18em]
                            text-slate-600
                        "
                    >
                        Discovery Journey
                    </p>
                </div>

                <div
                    className="
                        mt-auto
                        grid
                        grid-cols-2
                        gap-4
                        pt-8
                    "
                >
                    <div>
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

                    <div>
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