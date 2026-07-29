import FeatureCard from "../common/FeatureCard";
import MiniPlayer from "../common/MiniPlayer";
import FloatingSwipeCard from "../common/FloatingSwipeCard";

import {
    FiHeart,
    FiShuffle,
    FiMusic,
    FiZap,
    FiCompass,
} from "react-icons/fi";

export default function WhySpotinder() {

    return (

        <section
            className="
                relative
                mx-auto
                max-w-7xl
                px-6
                py-44
            "
        >

            <div
                className="
        absolute
        left-1/2
        top-1/2
        h-[700px]
        w-[700px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-400/[0.025]
        blur-[180px]
        pointer-events-none
    "
            />

            {/* Heading */}

            <div className="mx-auto max-w-3xl text-center">

                <p
                    className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.35em]
                        bg-gradient-to-r
                        from-cyan-400
                        to-violet-400
                        bg-clip-text
                        text-transparent
                    "
                >
                    WHY SPOTINDER
                </p>

                <h2
                    className="
                        mt-6
                        text-4xl
                        font-bold
                        tracking-tight
                        text-white
                        md:text-6xl
                    "
                >
                    Stop replaying.
                    <br />
                    Start discovering.
                </h2>

                <p
                    className="
                        mt-8
                        text-lg
                        leading-8
                        text-slate-400
                    "
                >
                    Spotify already knows what you like.
                    Spotinder helps you discover what you don't know yet.
                </p>

            </div>

            {/* Features */}

            <div
                className="
                    mt-20
                    grid
                    gap-8
                    md:grid-cols-2
                "
            >

                <FeatureCard
                    icon={FiShuffle}
                    title="Swipe Instead of Search"
                    description="Finding music should feel effortless. Swipe naturally until something clicks."
                    delay={0}
                >

                    <FloatingSwipeCard />

                </FeatureCard>

                <FeatureCard
                    icon={FiMusic}
                    title="Hear Before You Commit"
                    description="Preview songs instantly before deciding whether they're playlist-worthy."
                    delay={0.1}
                >
                    <MiniPlayer />
                </FeatureCard>

                <FeatureCard
                    icon={FiHeart}
                    title="Loved Songs Saved Automatically"
                    description="Every right swipe is remembered, so building playlists becomes effortless."
                    delay={0.2}
                />

                <FeatureCard
                    icon={FiCompass}
                    title="Escape the Algorithm"
                    description="Break out of repetitive recommendations and discover artists you've never seen before."
                    delay={0.3}
                />

            </div>

            {/* Large Bottom Card */}

            <div className="mt-8">

                <FeatureCard
                    icon={FiZap}
                    title="Built for Fast Discovery"
                    description="No endless scrolling. No decision fatigue. Just swipe, listen and discover your next favourite track in seconds."
                    delay={0.4}
                >

                    <div
                        className="
                            mt-6
                            flex
                            flex-wrap
                            gap-3
                        "
                    >

                        {[
                            "Instant previews",
                            "Spotify sync",
                            "No Premium required",
                            "Hidden gems",
                            "Smart playlists",
                        ].map((item) => (

                            <div
                                key={item}
                                className="
    rounded-full
    border
    border-cyan-400/20
    bg-cyan-400/10
    px-4
    py-2
    text-sm
    text-cyan-300
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-cyan-400/40
    hover:bg-cyan-400/15
    hover:text-white
"
                            >
                                {item}
                            </div>

                        ))}

                    </div>

                </FeatureCard>

            </div>

        </section>

    );

}