import {
    useInsights,
} from "../hooks/useInsights";


import DiscoveryScoreCard from "../components/DiscoveryScoreCard";
import InsightsHero from "../components/InsightsHero";
import SwipeBreakdown from "../components/SwipeBreakdown";
import DiscoveryPersonality from "../components/DiscoveryPersonality";




export default function InsightsPage() {
    const {
        data: insights,
        isLoading,
        isError,
    } = useInsights();

    if (isLoading) {
        return (
            <div className="p-10 text-slate-400">
                Loading insights...
            </div>
        );
    }

    if (
        isError ||
        !insights
    ) {
        return (
            <div className="p-10 text-rose-300">
                Couldn&apos;t load insights.
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
                <InsightsHero
                    insights={insights}
                />

                <div
                    className="
        mt-6
        grid
        gap-6
        lg:grid-cols-[0.9fr_1.1fr]
    "
                >
                    <DiscoveryScoreCard
                        score={insights.discoveryScore}
                    />

                    <SwipeBreakdown
                        insights={insights}
                    />
                </div>
                <DiscoveryPersonality
                    insights={insights}
                />
            </div>
        </section>
    );
}