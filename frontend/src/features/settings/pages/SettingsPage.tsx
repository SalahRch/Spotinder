import {
    FiCheck,
    FiExternalLink,
    FiLogOut,
    FiMusic,
} from "react-icons/fi";
import { motion } from "framer-motion";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function SettingsPage() {
    const {
        user,
        logout,
    } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(
                "Unable to sign out:",
                error,
            );
        }
    };

    return (
        <section
            className="
                min-h-full
                bg-[#0B0F17]
                text-white
            "
        >
            <div
                className="
                    mx-auto
                    w-full
                    max-w-4xl
                    py-10
                "
            >
                {/* Header */}

                <motion.header
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                    className="mb-10"
                >
                    <p
                        className="
                            mb-3
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-violet-300
                        "
                    >
                        Spotinder
                    </p>

                    <h1
                        className="
                            text-4xl
                            font-semibold
                            tracking-[-0.04em]
                            text-white
                        "
                    >
                        Settings
                    </h1>

                    <p
                        className="
                            mt-3
                            max-w-xl
                            text-sm
                            leading-6
                            text-slate-500
                        "
                    >
                        Manage your connected account
                        and Spotinder session.
                    </p>
                </motion.header>

                <div className="space-y-6">

                    {/* Spotify */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 14,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.05,
                        }}
                        className="
                            rounded-[28px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-7
                            shadow-[0_20px_70px_rgba(0,0,0,0.18)]
                        "
                    >
                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-6
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-emerald-400/15
                                        bg-emerald-400/[0.07]
                                        text-emerald-300
                                    "
                                >
                                    <FiMusic className="text-xl" />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.2em]
                                            text-slate-500
                                        "
                                    >
                                        Spotify
                                    </p>

                                    <h2
                                        className="
                                            mt-1
                                            text-lg
                                            font-semibold
                                            text-slate-100
                                        "
                                    >
                                        Connected account
                                    </h2>
                                </div>
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-emerald-400/15
                                    bg-emerald-400/[0.06]
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-emerald-300
                                "
                            >
                                <FiCheck />
                                Connected
                            </div>
                        </div>

                        <div
                            className="
                                my-6
                                h-px
                                bg-white/[0.06]
                            "
                        />

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-6
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt=""
                                        draggable={false}
                                        className="
                                            h-12
                                            w-12
                                            rounded-full
                                            object-cover
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white/[0.06]
                                            text-sm
                                            font-semibold
                                            text-slate-300
                                        "
                                    >
                                        {user?.displayName
                                            ?.charAt(0)
                                            .toUpperCase() ?? "S"}
                                    </div>
                                )}

                                <div>
                                    <p
                                        className="
                                            font-medium
                                            text-slate-100
                                        "
                                    >
                                        {user?.displayName ??
                                            "Spotify user"}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        {user?.product
                                            ? `${user.product.toUpperCase()} plan`
                                            : "Spotify account"}
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://open.spotify.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.035]
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-slate-300
                                    transition
                                    duration-200
                                    hover:border-white/[0.14]
                                    hover:bg-white/[0.06]
                                    hover:text-white
                                "
                            >
                                Open Spotify
                                <FiExternalLink />
                            </a>
                        </div>
                    </motion.section>

                    {/* Account */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 14,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1,
                        }}
                        className="
                            rounded-[28px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-7
                        "
                    >
                        <div className="mb-6">
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-slate-500
                                "
                            >
                                Account
                            </p>

                            <h2
                                className="
                                    mt-2
                                    text-lg
                                    font-semibold
                                    text-slate-100
                                "
                            >
                                Session
                            </h2>
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-6
                                rounded-2xl
                                border
                                border-white/[0.06]
                                bg-white/[0.025]
                                p-5
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
                                    Sign out
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    End your current Spotinder
                                    session on this device.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    void handleLogout();
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-rose-400/15
                                    bg-rose-400/[0.05]
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-rose-300
                                    transition
                                    duration-200
                                    hover:border-rose-400/30
                                    hover:bg-rose-400/[0.09]
                                "
                            >
                                <FiLogOut />
                                Sign out
                            </button>
                        </div>
                    </motion.section>
                </div>
            </div>
        </section>
    );
}