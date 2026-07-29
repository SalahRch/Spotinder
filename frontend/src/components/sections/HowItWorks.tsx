import StepCard from "../common/StepCard";
import TimelineLine from "../common/TimelineLine";

import { FaSpotify } from "react-icons/fa";
import { FiHeart, FiShuffle } from "react-icons/fi";

export default function HowItWorks() {
    return (
        <section
            className="
                relative
                mx-auto
                max-w-7xl
                px-6
                py-36
            "
            id="how-it-works"
        >

            {/* Section Heading */}

            <div className="mx-auto max-w-4xl text-center">

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
                    HOW IT WORKS
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
                    Your next favourite song
                    <br />
                    is only three steps away.
                </h2>

                <p
                    className="
                        mt-8
                        text-lg
                        leading-8
                        text-slate-400
                    "
                >
                    Connect Spotify, swipe through songs,
                    and build a playlist you'll actually love.
                </p>

            </div>

            {/* Cards */}

            <div className="relative mt-24">

                <TimelineLine />

                <div
                    className="
                        relative
                        grid
                        grid-cols-1
                        gap-8
                        md:grid-cols-3
                    "
                >

                    <StepCard
                        number="01"
                        icon={FaSpotify}
                        title="Connect Spotify"
                        description="Log in securely with your Spotify account. No Premium required."
                        delay={0}
                    />

                    <StepCard
                        number="02"
                        icon={FiShuffle}
                        title="Swipe Songs"
                        description="Discover tracks you've never heard before. Swipe left or right in seconds."
                        delay={0.15}
                    />

                    <StepCard
                        number="03"
                        icon={FiHeart}
                        title="Build Playlist"
                        description="Every song you love is automatically saved for later listening."
                        delay={0.30}
                    />

                </div>

            </div>

        </section>
    );
}