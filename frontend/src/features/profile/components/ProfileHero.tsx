import { motion } from "framer-motion";
import {
    FiCheck,
    FiMusic,
} from "react-icons/fi";

import type {
    Profile,
} from "../types/profile";

type ProfileHeroProps = {
    profile: Profile;
};

function formatMemberSince(
    createdAt: string,
) {
    return new Intl.DateTimeFormat(
        "en",
        {
            month: "long",
            year: "numeric",
        },
    ).format(
        new Date(createdAt),
    );
}

export default function ProfileHero({
                                        profile,
                                    }: ProfileHeroProps) {
    const memberSince =
        formatMemberSince(
            profile.createdAt,
        );

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.55,
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
                rounded-[32px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-8
                py-9
                shadow-[0_30px_100px_rgba(0,0,0,0.28)]
                backdrop-blur-2xl
                lg:px-10
                lg:py-10
            "
        >
            {/* Atmosphere */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-28
                    h-[430px]
                    w-[430px]
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400/10
                    via-violet-500/15
                    to-fuchsia-500/10
                    blur-[110px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-[-140px]
                    left-[20%]
                    h-[300px]
                    w-[300px]
                    rounded-full
                    bg-violet-500/[0.06]
                    blur-[110px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    grid
                    gap-10
                    lg:grid-cols-[1fr_auto]
                    lg:items-center
                "
            >
                {/* Identity */}

                <div>
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.28em]
                            text-violet-300/75
                        "
                    >
                        <FiMusic />

                        Your Spotinder profile
                    </div>

                    <div
                        className="
                            mt-7
                            flex
                            flex-col
                            gap-6
                            sm:flex-row
                            sm:items-center
                        "
                    >
                        {/* Avatar */}

                        <div
                            className="
                                relative
                                h-28
                                w-28
                                shrink-0
                            "
                        >
                            <div
                                className="
                                    absolute
                                    inset-[-8px]
                                    rounded-full
                                    bg-gradient-to-br
                                    from-cyan-400/25
                                    via-violet-500/25
                                    to-fuchsia-500/25
                                    blur-xl
                                "
                            />

                            <div
                                className="
                                    relative
                                    h-full
                                    w-full
                                    overflow-hidden
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-white/[0.04]
                                    p-1
                                    shadow-[0_20px_55px_rgba(0,0,0,0.38)]
                                "
                            >
                                {profile.avatarUrl ? (
                                    <img
                                        src={
                                            profile.avatarUrl
                                        }
                                        alt={
                                            profile.displayName
                                        }
                                        className="
                                            h-full
                                            w-full
                                            rounded-full
                                            object-cover
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex
                                            h-full
                                            w-full
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white/[0.04]
                                            text-3xl
                                            font-semibold
                                            text-slate-300
                                        "
                                    >
                                        {profile.displayName
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Copy */}

                        <div className="min-w-0">
                            <h1
                                className="
                                    truncate
                                    text-4xl
                                    font-semibold
                                    tracking-tight
                                    text-white
                                    sm:text-5xl
                                "
                            >
                                {
                                    profile.displayName
                                }
                            </h1>

                            <p
                                className="
                                    mt-2
                                    truncate
                                    text-sm
                                    text-slate-400
                                    sm:text-base
                                "
                            >
                                {profile.email}
                            </p>

                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        rounded-full
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        px-3.5
                                        py-2
                                        text-xs
                                        text-slate-300
                                    "
                                >
                                    {
                                        profile.product
                                    } listener
                                </span>

                                <span
                                    className="
                                        rounded-full
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        px-3.5
                                        py-2
                                        text-xs
                                        text-slate-300
                                    "
                                >
                                    {
                                        profile.country
                                    }
                                </span>

                                <span
                                    className="
                                        rounded-full
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.035]
                                        px-3.5
                                        py-2
                                        text-xs
                                        text-slate-300
                                    "
                                >
                                    Since{" "}
                                    {
                                        memberSince
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spotify status */}

                <motion.div
                    whileHover={{
                        y: -3,
                    }}
                    transition={{
                        duration: 0.25,
                    }}
                    className="
                        min-w-[240px]
                        rounded-[24px]
                        border
                        border-white/[0.07]
                        bg-white/[0.035]
                        p-5
                        backdrop-blur-xl
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[11px]
                                    font-medium
                                    uppercase
                                    tracking-[0.22em]
                                    text-slate-500
                                "
                            >
                                Spotify account
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    font-medium
                                    text-slate-200
                                "
                            >
                                Connected
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-emerald-400/20
                                bg-emerald-400/[0.08]
                                text-emerald-300
                            "
                        >
                            <FiCheck />
                        </div>
                    </div>

                    <div
                        className="
                            mt-5
                            h-px
                            bg-white/[0.06]
                        "
                    />

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            text-xs
                        "
                    >
                        <span className="text-slate-500">
                            Plan
                        </span>

                        <span className="font-medium text-white">
                            {
                                profile.product
                            }
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}