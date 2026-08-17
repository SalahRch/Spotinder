import {
    useState,
} from "react";

import {
    onboardingService,
} from "../services/onboarding";

import api from "@/services/api";

type AdventureSetupProps = {
    onComplete: () => Promise<void>;
};

export default function AdventureSetup({
                                           onComplete,
                                       }: AdventureSetupProps) {
    const [
        adventureLevel,
        setAdventureLevel,
    ] = useState(50);

    const [
        isSaving,
        setIsSaving,
    ] = useState(false);

    const handleComplete =
        async () => {
            try {
                setIsSaving(true);

                await api.patch(
                    "/users/me/preferences",
                    {
                        adventureLevel,
                    },
                );

                await onboardingService.complete();

                await onComplete();
            } finally {
                setIsSaving(false);
            }
        };

    return (
        <div
            className="
                mx-auto
                w-full
                max-w-[760px]
                text-center
            "
        >
            <p
                className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-cyan-300/70
                "
            >
                Adventure mode
            </p>

            <h1
                className="
                    mt-4
                    text-4xl
                    font-semibold
                    tracking-[-0.055em]
                    text-white
                    md:text-5xl
                "
            >
                How far should we go?
            </h1>

            <p
                className="
                    mx-auto
                    mt-4
                    max-w-xl
                    text-sm
                    leading-7
                    text-slate-500
                "
            >
                Choose how far Spotinder
                should push beyond your
                familiar listening world.
            </p>

            <div
                className="
                    mt-12
                    rounded-[30px]
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    p-8
                "
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <span
                        className="
                            text-xs
                            uppercase
                            tracking-[0.16em]
                            text-slate-600
                        "
                    >
                        Comfort zone
                    </span>

                    <span
                        className="
                            text-3xl
                            font-semibold
                            text-white
                        "
                    >
                        {adventureLevel}%
                    </span>

                    <span
                        className="
                            text-xs
                            uppercase
                            tracking-[0.16em]
                            text-slate-600
                        "
                    >
                        Explore everything
                    </span>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={adventureLevel}
                    onChange={(event) =>
                        setAdventureLevel(
                            Number(
                                event.target.value,
                            ),
                        )
                    }
                    className="
                        mt-8
                        w-full
                        accent-violet-400
                    "
                />

                <p
                    className="
                        mt-6
                        text-sm
                        leading-6
                        text-slate-400
                    "
                >
                    {adventureLevel < 35
                        ? "Stay close to the sounds you already love."
                        : adventureLevel < 70
                            ? "Balance familiar favorites with new territory."
                            : "Push hard into unfamiliar sounds and unexpected discoveries."}
                </p>
            </div>

            <button
                type="button"
                onClick={handleComplete}
                disabled={isSaving}
                className="
                    mt-10
                    rounded-full
                    border
                    border-violet-400/20
                    bg-violet-400/[0.10]
                    px-8
                    py-3
                    text-sm
                    font-medium
                    text-violet-100
                    transition
                    hover:bg-violet-400/[0.16]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {isSaving
                    ? "Starting your journey..."
                    : "Start discovering"}
            </button>
        </div>
    );
}