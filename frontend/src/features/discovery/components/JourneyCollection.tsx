import {
    FiArrowRight,
} from "react-icons/fi";
import {
    useNavigate,
} from "react-router-dom";

import {
    useJourneys,
} from "../hooks/useJourneys";


import LatestJourneyCard
    from "./LatestJourneyCard";


export default function JourneyCollection() {
    const navigate =
        useNavigate();

    const {
        data: journeys = [],
        isLoading,
        isError,
    } = useJourneys();


    if (isLoading) {
        return (
            <section>
                <JourneyHeader
                    onViewAll={() => {
                        navigate(
                            "/app/journeys",
                        );
                    }}
                />

                <div
                    className="
                        mt-7
                        h-[280px]
                        animate-pulse
                        rounded-[32px]
                        border
                        border-white/[0.05]
                        bg-white/[0.025]
                    "
                />
            </section>
        );
    }

    if (isError) {
        return null;
    }

    if (journeys.length === 0) {
        return (
            <section>
                <JourneyHeader
                    onViewAll={() => {
                        navigate(
                            "/app/journeys",
                        );
                    }}
                />

                <div
                    className="
                        mt-7
                        rounded-[30px]
                        border
                        border-dashed
                        border-white/[0.08]
                        bg-white/[0.02]
                        px-6
                        py-10
                        text-center
                    "
                >
                    <p
                        className="
                            text-sm
                            text-slate-400
                        "
                    >
                        Complete a Daily Discovery
                        to begin your Journey archive.
                    </p>
                </div>
            </section>
        );
    }

    const latestJourney =
        journeys[0];

    return (
        <section>
            <JourneyHeader
                onViewAll={() => {
                    navigate(
                        "/app/journeys",
                    );
                }}
            />

            <div className="mt-7">
                <LatestJourneyCard
                    journey={
                        latestJourney
                    }
                    onClick={() => {
                        navigate(
                            `/app/journeys/${latestJourney.id}`,
                        );
                    }}
                />
            </div>
        </section>
    );
}

type JourneyHeaderProps = {
    onViewAll: () => void;
};

function JourneyHeader({
                           onViewAll,
                       }: JourneyHeaderProps) {
    return (
        <div
            className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
            "
        >
            <div>
                <p
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.24em]
                        text-violet-300/60
                    "
                >
                    Your Journeys
                </p>

                <h2
                    className="
                        mt-2
                        text-2xl
                        font-semibold
                        tracking-[-0.04em]
                        text-white
                    "
                >
                    Your discovery story,
                    one day at a time.
                </h2>

                <p
                    className="
                        mt-2
                        max-w-xl
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    Revisit your latest
                    completed Discovery Journey.
                </p>
            </div>

            <button
                type="button"
                onClick={onViewAll}
                className="
                    flex
                    items-center
                    gap-2
                    self-start
                    text-xs
                    font-medium
                    text-violet-300
                    transition
                    hover:text-violet-200
                    sm:self-auto
                "
            >
                View all journeys
                <FiArrowRight />
            </button>
        </div>
    );
}