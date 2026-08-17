import {
    useEffect,
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    useNavigate,
} from "react-router-dom";

import {
    useAuth,
} from "@/features/auth/hooks/useAuth";

import {
    useOnboardingProfile,
} from "../hooks/useOnboardingProfile";

import TasteAnalysis
    from "../components/TasteAnalysis";

import DiscoveryProfile
    from "../components/DiscoveryProfile";

import AdventureSetup
    from "../components/AdventureSetup";

type Step =
    | "ANALYSIS"
    | "PROFILE"
    | "ADVENTURE";

export default function OnboardingPage() {
    const navigate =
        useNavigate();

    const {
        refresh,
    } = useAuth();

    const {
        data: profile,
        isLoading,
        isError,
    } = useOnboardingProfile();

    const [
        step,
        setStep,
    ] = useState<Step>(
        "ANALYSIS",
    );

    useEffect(() => {
        if (
            !isLoading &&
            profile &&
            step === "ANALYSIS"
        ) {
            const timeout =
                window.setTimeout(
                    () => {
                        setStep(
                            "PROFILE",
                        );
                    },
                    1100,
                );

            return () => {
                window.clearTimeout(
                    timeout,
                );
            };
        }
    }, [
        isLoading,
        profile,
        step,
    ]);

    if (isError) {
        return (
            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-[#0B0F17]
                    text-rose-300
                "
            >
                Couldn&apos;t build
                your discovery profile.
            </div>
        );
    }

    return (
        <main
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#0B0F17]
                text-white
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-[10%]
                    top-[-180px]
                    h-[520px]
                    w-[520px]
                    rounded-full
                    bg-violet-500/[0.10]
                    blur-[150px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[5%]
                    top-[30%]
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-cyan-400/[0.06]
                    blur-[140px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    w-full
                    max-w-[1180px]
                    items-center
                    justify-center
                    px-6
                    py-10
                "
            >
                <AnimatePresence
                    mode="wait"
                >
                    {step ===
                        "ANALYSIS" && (
                            <motion.div
                                key="analysis"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                }}
                                transition={{
                                    duration: 0.45,
                                }}
                                className="w-full"
                            >
                                <TasteAnalysis />
                            </motion.div>
                        )}

                    {step ===
                        "PROFILE" &&
                        profile && (
                            <motion.div
                                key="profile"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                }}
                                transition={{
                                    duration: 0.45,
                                }}
                                className="w-full"
                            >
                                <DiscoveryProfile
                                    profile={
                                        profile
                                    }
                                    onContinue={() =>
                                        setStep(
                                            "ADVENTURE",
                                        )
                                    }
                                />
                            </motion.div>
                        )}

                    {step ===
                        "ADVENTURE" && (
                            <motion.div
                                key="adventure"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.45,
                                }}
                                className="w-full"
                            >
                                <AdventureSetup
                                    onComplete={async () => {
                                        await refresh();

                                        navigate(
                                            "/app",
                                            {
                                                replace:
                                                    true,
                                            },
                                        );
                                    }}
                                />
                            </motion.div>
                        )}
                </AnimatePresence>
            </div>
        </main>
    );
}