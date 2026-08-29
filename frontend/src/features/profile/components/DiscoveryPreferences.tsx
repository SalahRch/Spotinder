import {
    useState,
} from "react";

import { motion } from "framer-motion";
import {
    FiEyeOff,
    FiSliders,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
    useUpdatePreferences,
} from "../hooks/useProfile";

import type {
    Profile,
} from "../types/profile";

type DiscoveryPreferencesProps = {
    profile: Profile;
};

export default function DiscoveryPreferences({
                                                 profile,
                                             }: DiscoveryPreferencesProps) {
    const updatePreferences =
        useUpdatePreferences();

    const [
        adventureLevel,
        setAdventureLevel,
    ] = useState(
        profile.adventureLevel,
    );

    const [
        blindMode,
        setBlindMode,
    ] = useState(
        profile.blindModeDefault,
    );


    const handleAdventureCommit =
        async () => {
            if (
                adventureLevel ===
                profile.adventureLevel
            ) {
                return;
            }

            try {
                await updatePreferences.mutateAsync({
                    adventureLevel,
                });

                toast.success(
                    "Adventure level updated.",
                );
            } catch (error) {
                console.error(
                    "Unable to update adventure level:",
                    error,
                );

                setAdventureLevel(
                    profile.adventureLevel,
                );

                toast.error(
                    "We couldn't update your preference.",
                );
            }
        };

    const handleBlindModeToggle =
        async () => {
            const nextValue =
                !blindMode;

            setBlindMode(
                nextValue,
            );

            try {
                await updatePreferences.mutateAsync({
                    blindModeDefault:
                    nextValue,
                });

                toast.success(
                    nextValue
                        ? "Blind Discovery enabled."
                        : "Blind Discovery disabled.",
                );
            } catch (error) {
                console.error(
                    "Unable to update Blind Discovery:",
                    error,
                );

                setBlindMode(
                    !nextValue,
                );

                toast.error(
                    "We couldn't update your preference.",
                );
            }
        };

    return (
        <section
            className="
                mt-6
                grid
                gap-6
                lg:grid-cols-2
            "
        >
            {/* Adventure */}

            <motion.article
                initial={{
                    opacity: 0,
                    y: 18,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.12,
                    duration: 0.5,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                    ],
                }}
                className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-8
                    backdrop-blur-xl
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-56
                        w-56
                        rounded-full
                        bg-violet-500/[0.08]
                        blur-[90px]
                    "
                />

                <div className="relative z-10">
                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-5
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.24em]
                                    text-violet-300/70
                                "
                            >
                                Your adventure
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-xl
                                    font-semibold
                                    text-white
                                "
                            >
                                How far should we wander?
                            </h2>

                            <p
                                className="
                                    mt-3
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Higher values move
                                recommendations further
                                beyond your usual taste.
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-violet-400/15
                                bg-violet-400/[0.07]
                                text-violet-300
                            "
                        >
                            <FiSliders />
                        </div>
                    </div>

                    <div className="mt-9">
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <span className="text-xs text-slate-500">
                                Comfort zone
                            </span>

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.035]
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-white
                                "
                            >
                                {adventureLevel}%
                            </span>

                            <span className="text-xs text-slate-500">
                                Explore everything
                            </span>
                        </div>

                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={
                                adventureLevel
                            }
                            onChange={(
                                event,
                            ) => {
                                setAdventureLevel(
                                    Number(
                                        event
                                            .target
                                            .value,
                                    ),
                                );
                            }}
                            onMouseUp={() => {
                                void handleAdventureCommit();
                            }}
                            onTouchEnd={() => {
                                void handleAdventureCommit();
                            }}
                            className="
                                mt-5
                                w-full
                                cursor-pointer
                                accent-violet-400
                            "
                        />
                    </div>
                </div>
            </motion.article>

            {/* Blind Discovery */}

            <motion.article
                initial={{
                    opacity: 0,
                    y: 18,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.2,
                    duration: 0.5,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                    ],
                }}
                className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-8
                    backdrop-blur-xl
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -left-20
                        -bottom-24
                        h-56
                        w-56
                        rounded-full
                        bg-cyan-400/[0.06]
                        blur-[90px]
                    "
                />

                <div className="relative z-10">
                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-5
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.24em]
                                    text-violet-300/70
                                "
                            >
                                Blind Discovery
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-xl
                                    font-semibold
                                    text-white
                                "
                            >
                                Hear it before you judge it.
                            </h2>

                            <p
                                className="
                                    mt-3
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Hide track and artist
                                identity by default while
                                discovering new music.
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-cyan-400/15
                                bg-cyan-400/[0.07]
                                text-cyan-300
                            "
                        >
                            <FiEyeOff />
                        </div>
                    </div>

                    <div
                        className="
                            mt-10
                            flex
                            items-center
                            justify-between
                            rounded-[22px]
                            border
                            border-white/[0.06]
                            bg-white/[0.025]
                            px-5
                            py-4
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-200
                                "
                            >
                                Default mode
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                {blindMode
                                    ? "Track identity stays hidden."
                                    : "Track identity stays visible."}
                            </p>
                        </div>

                        <button
                            type="button"
                            aria-pressed={
                                blindMode
                            }
                            onClick={() => {
                                void handleBlindModeToggle();
                            }}
                            className={`
                                relative
                                h-7
                                w-12
                                shrink-0
                                rounded-full
                                border
                                transition
                                duration-300

                                ${
                                blindMode
                                    ? `
                                            border-violet-400/30
                                            bg-violet-500/30
                                        `
                                    : `
                                            border-white/10
                                            bg-white/[0.06]
                                        `
                            }
                            `}
                        >
                            <motion.span
                                animate={{
                                    x: blindMode
                                        ? 22
                                        : 4,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 450,
                                    damping: 30,
                                }}
                                className={`
                                    absolute
                                    left-0
                                    top-1/2
                                    h-5
                                    w-5
                                    -translate-y-1/2
                                    rounded-full
                                    shadow-md

                                    ${
                                    blindMode
                                        ? "bg-violet-300"
                                        : "bg-slate-500"
                                }
                                `}
                            />
                        </button>
                    </div>
                </div>
            </motion.article>
        </section>
    );
}