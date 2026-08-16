import {
    useMemo,
    useState,
} from "react";


import {
    useJourneys,
} from "@/features/discovery/hooks/useJourneys";

import {
    useJourney,
} from "@/features/discovery/hooks/useJourney";

import JourneyCollectionCard
    from "@/features/discovery/components/JourneyCollectionCard";

import DailyJourneyRecap
    from "@/features/discovery/components/DailyJourneyRecap";

import type {
    JourneySummary,
} from "@/features/discovery/types/discovery";


type DateFilter =
    | "ALL"
    | "TODAY"
    | "THIS_WEEK"
    | "THIS_MONTH";

type SortOption =
    | "NEWEST"
    | "OLDEST"
    | "ADVENTURE_HIGH"
    | "HIT_RATE_HIGH";

type PersonaFilter =
    | "ALL"
    | JourneySummary["discoveryPersona"];


export default function JourneysPage() {
    const {
        data: journeys = [],
        isLoading,
        isError,
    } = useJourneys();

    const [
        selectedJourneyId,
        setSelectedJourneyId,
    ] = useState<string | null>(
        null,
    );

    const [
        personaFilter,
        setPersonaFilter,
    ] = useState<PersonaFilter>(
        "ALL",
    );

    const [
        dateFilter,
        setDateFilter,
    ] = useState<DateFilter>(
        "ALL",
    );

    const [
        sortOption,
        setSortOption,
    ] = useState<SortOption>(
        "NEWEST",
    );


    const {
        data: selectedJourney,
        isLoading: isJourneyLoading,
    } = useJourney(
        selectedJourneyId ??
        undefined,
    );

    const filteredJourneys =
        useMemo(() => {

            const now =
                new Date();

            const startOfToday =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                );

            const startOfWeek =
                new Date(
                    startOfToday,
                );

            const day =
                startOfWeek.getDay();

            const daysFromMonday =
                day === 0
                    ? 6
                    : day - 1;

            startOfWeek.setDate(
                startOfWeek.getDate() -
                daysFromMonday,
            );

            const startOfMonth =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    1,
                );

            const result =
                journeys.filter(
                    (journey) => {
                        const journeyDate =
                            new Date(
                                `${journey.date}T00:00:00`,
                            );

                        const matchesPersona =
                            personaFilter ===
                            "ALL" ||
                            journey.discoveryPersona ===
                            personaFilter;

                        let matchesDate =
                            true;

                        if (
                            dateFilter ===
                            "TODAY"
                        ) {
                            matchesDate =
                                journeyDate >=
                                startOfToday;
                        }

                        if (
                            dateFilter ===
                            "THIS_WEEK"
                        ) {
                            matchesDate =
                                journeyDate >=
                                startOfWeek;
                        }

                        if (
                            dateFilter ===
                            "THIS_MONTH"
                        ) {
                            matchesDate =
                                journeyDate >=
                                startOfMonth;
                        }

                        return (
                            matchesPersona &&
                            matchesDate
                        );
                    },
                );

            return [...result].sort(
                (a, b) => {
                    switch (
                        sortOption
                        ) {
                        case "OLDEST":
                            return (
                                new Date(
                                    a.date,
                                ).getTime() -
                                new Date(
                                    b.date,
                                ).getTime()
                            );

                        case "ADVENTURE_HIGH":
                            return (
                                b.averageAdventureLevel -
                                a.averageAdventureLevel
                            );

                        case "HIT_RATE_HIGH":
                            return (
                                b.likeRate -
                                a.likeRate
                            );

                        case "NEWEST":
                        default:
                            return (
                                new Date(
                                    b.date,
                                ).getTime() -
                                new Date(
                                    a.date,
                                ).getTime()
                            );
                    }
                },
            );
        }, [
            journeys,
            personaFilter,
            dateFilter,
            sortOption,
        ]);


    if (isLoading) {
        return (
            <div
                className="
                    min-h-screen
                    bg-[#0B0F17]
                    p-10
                    text-slate-400
                "
            >
                Loading journeys...
            </div>
        );
    }

    if (isError) {
        return (
            <div
                className="
                    min-h-screen
                    bg-[#0B0F17]
                    p-10
                    text-rose-300
                "
            >
                Couldn&apos;t load
                your journeys.
            </div>
        );
    }

    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#0B0F17]
                text-white
            "
        >
            {/* Background atmosphere */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-[15%]
                    top-[-180px]
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-violet-500/[0.06]
                    blur-[140px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[5%]
                    top-[200px]
                    h-[360px]
                    w-[360px]
                    rounded-full
                    bg-cyan-400/[0.035]
                    blur-[130px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-[1280px]
                    px-6
                    py-10
                    lg:px-10
                    lg:py-12
                "
            >
                {/* Header */}

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.26em]
                                text-violet-300/70
                            "
                        >
                            Discovery Archive
                        </p>

                        <h1
                            className="
                                mt-3
                                text-4xl
                                font-semibold
                                tracking-[-0.055em]
                                text-white
                                md:text-5xl
                            "
                        >
                            Your Journeys
                        </h1>

                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            Every day leaves a trace.
                            Revisit the moments that
                            shaped your discovery story.
                        </p>
                    </div>

                    <div
                        className="
                            text-left
                            lg:text-right
                        "
                    >
                        <p
                            className="
                                text-3xl
                                font-semibold
                                tracking-[-0.04em]
                                text-white
                            "
                        >
                            {journeys.length}
                        </p>

                        <p
                            className="
                                mt-1
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-slate-600
                            "
                        >
                            Journeys completed
                        </p>
                    </div>
                </div>


                {/* Controls */}

                <div
                    className="
                        mt-10
                        border-y
                        border-white/[0.06]
                        py-5
                    "
                >
                    {/* Persona filters */}

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-2
                        "
                    >
                        <FilterButton
                            active={
                                personaFilter ===
                                "ALL"
                            }
                            onClick={() =>
                                setPersonaFilter(
                                    "ALL",
                                )
                            }
                        >
                            All
                        </FilterButton>

                        {[
                            "EXPLORER",
                            "ROMANTIC",
                            "PURIST",
                            "CURATOR",
                            "WANDERER",
                            "WILDCARD",
                        ].map(
                            (persona) => (
                                <FilterButton
                                    key={persona}
                                    active={
                                        personaFilter ===
                                        persona
                                    }
                                    onClick={() =>
                                        setPersonaFilter(
                                            persona as PersonaFilter,
                                        )
                                    }
                                >
                                    {formatPersona(
                                        persona,
                                    )}
                                </FilterButton>
                            ),
                        )}
                    </div>


                    {/* Archive controls */}

                    <div
                        className="
                            mt-4
                            flex
                            flex-col
                            gap-3
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                gap-3
                            "
                        >
                            <select
                                value={dateFilter}
                                onChange={(event) =>
                                    setDateFilter(
                                        event.target
                                            .value as DateFilter,
                                    )
                                }
                                className="
                                    rounded-full
                                    border
                                    border-white/[0.07]
                                    bg-[#111722]
                                    px-4
                                    py-2.5
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-300
                                    outline-none
                                    transition
                                    hover:border-white/[0.12]
                                "
                            >
                                <option value="ALL">
                                    Any date
                                </option>

                                <option value="TODAY">
                                    Today
                                </option>

                                <option value="THIS_WEEK">
                                    This week
                                </option>

                                <option value="THIS_MONTH">
                                    This month
                                </option>
                            </select>

                            <select
                                value={sortOption}
                                onChange={(event) =>
                                    setSortOption(
                                        event.target
                                            .value as SortOption,
                                    )
                                }
                                className="
                                    rounded-full
                                    border
                                    border-white/[0.07]
                                    bg-[#111722]
                                    px-4
                                    py-2.5
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-300
                                    outline-none
                                    transition
                                    hover:border-white/[0.12]
                                "
                            >
                                <option value="NEWEST">
                                    Newest first
                                </option>

                                <option value="OLDEST">
                                    Oldest first
                                </option>

                                <option value="ADVENTURE_HIGH">
                                    Highest adventure
                                </option>

                                <option value="HIT_RATE_HIGH">
                                    Highest hit rate
                                </option>
                            </select>
                        </div>
                    </div>
                </div>


                {/* Archive */}

                {filteredJourneys.length >
                0 ? (
                    <div
                        className="
                            mt-8
                            grid
                            gap-5
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >
                        {filteredJourneys.map(
                            (journey) => (
                                <JourneyCollectionCard
                                    key={
                                        journey.id
                                    }
                                    journey={
                                        journey
                                    }
                                    onClick={() =>
                                        setSelectedJourneyId(
                                            journey.id,
                                        )
                                    }
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <div
                        className="
                            mt-16
                            text-center
                        "
                    >
                        <p
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            No journeys match
                            those filters.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setPersonaFilter(
                                    "ALL",
                                );
                                setDateFilter(
                                    "ALL",
                                );
                                setSortOption(
                                    "NEWEST",
                                );
                            }}
                            className="
                                mt-3
                                text-xs
                                font-medium
                                text-violet-300
                                transition
                                hover:text-violet-200
                            "
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>


            {/* Journey detail */}

            <DailyJourneyRecap
                open={
                    selectedJourneyId !==
                    null
                }
                recap={selectedJourney}
                loading={
                    isJourneyLoading
                }
                onClose={() =>
                    setSelectedJourneyId(
                        null,
                    )
                }
            />
        </section>
    );
}


type FilterButtonProps = {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
};

function FilterButton({
                          children,
                          active,
                          onClick,
                      }: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                rounded-full
                border
                px-4
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.14em]
                transition

                ${
                active
                    ? `
                            border-violet-300/20
                            bg-violet-400/10
                            text-violet-200
                        `
                    : `
                            border-white/[0.06]
                            bg-white/[0.02]
                            text-slate-500
                            hover:border-white/[0.10]
                            hover:text-slate-300
                        `
            }
            `}
        >
            {children}
        </button>
    );
}


function formatPersona(
    persona: string,
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
}