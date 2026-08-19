import {
    motion,
} from "framer-motion";

import {
    useAchievements,
} from "../hooks/useAchievements";

import AchievementCard
    from "./AchievementCard";

export default function AchievementCollection() {
    const {
        data: achievements = [],
        isLoading,
        isError,
    } = useAchievements();

    if (
        isLoading ||
        isError
    ) {
        return null;
    }

    const unlockedCount =
        achievements.filter(
            (achievement) =>
                achievement.unlocked,
        ).length;

    const total =
        achievements.length;

    const progress =
        total === 0
            ? 0
            : (unlockedCount /
                total) *
            100;

    return (
        <section
            className="
                mt-10
            "
        >
            {/* Header */}

            <div
                className="
                    flex
                    flex-col
                    gap-5
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
                            tracking-[0.24em]
                            text-violet-300/60
                        "
                    >
                        Achievements
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
                        Marks of your
                        discovery journey.
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
                        Explore differently,
                        take risks, and uncover
                        achievements hidden
                        throughout Spotinder.
                    </p>
                </div>

                <div
                    className="
                        min-w-[180px]
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-slate-600
                        "
                    >
                        <span>
                            Discovered
                        </span>

                        <span
                            className="
                                text-slate-400
                            "
                        >
                            {unlockedCount}
                            {" / "}
                            {total}
                        </span>
                    </div>

                    <div
                        className="
                            mt-3
                            h-1
                            overflow-hidden
                            rounded-full
                            bg-white/[0.05]
                        "
                    >
                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width:
                                    `${progress}%`,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-cyan-300
                                via-violet-300
                                to-fuchsia-300
                            "
                        />
                    </div>
                </div>
            </div>

            {/* Collection */}

            <div
                className="
                    mt-7
                    grid
                    gap-4
                    md:grid-cols-2
                    xl:grid-cols-3
                "
            >
                {achievements.map(
                    (
                        achievement,
                    ) => (
                        <AchievementCard
                            key={
                                achievement.type
                            }
                            achievement={
                                achievement
                            }
                        />
                    ),
                )}
            </div>
        </section>
    );
}