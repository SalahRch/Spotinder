import { motion } from "framer-motion";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";

type JourneyShareCardProps = {
    recap: DailyDiscoveryRecap;
};

function formatPersona(
    persona: DailyDiscoveryRecap["discoveryPersona"],
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase(),
        );
}

export default function JourneyShareCard({
                                             recap,
                                         }: JourneyShareCardProps) {
    return (
        <div
            className="
                relative
                aspect-[9/16]
                w-full
                max-w-[390px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.08]
                bg-[#080D16]
                shadow-[0_35px_100px_rgba(0,0,0,0.55)]
            "
        >
            {/* Aura */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    top-20
                    h-[300px]
                    w-[300px]
                    rounded-full
                    bg-violet-500/[0.18]
                    blur-[110px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    bottom-28
                    h-[300px]
                    w-[300px]
                    rounded-full
                    bg-cyan-400/[0.14]
                    blur-[110px]
                "
            />

            {/* Persona motif */}

            <motion.div
                aria-hidden="true"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[38%]
                    h-[220px]
                    w-[340px]
                    -translate-x-1/2
                    rounded-[50%]
                    border
                    border-violet-300/[0.06]
                "
            />

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    px-8
                    py-8
                "
            >
                {/* Brand */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.34em]
                                text-violet-300
                            "
                        >
                            Spotinder
                        </p>

                        <p
                            className="
                                mt-1
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-slate-600
                            "
                        >
                            Discovery Journey
                        </p>
                    </div>

                    <div
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-violet-300/15
                            bg-violet-400/[0.07]
                            text-xs
                            font-semibold
                            text-violet-200
                        "
                    >
                        S
                    </div>
                </div>

                {/* Hero */}

                <div
                    className="
                        mt-16
                        text-center
                    "
                >
                    <p
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.26em]
                            text-slate-600
                        "
                    >
                        {new Date(
                            `${recap.date}T00:00:00`,
                        ).toLocaleDateString(
                            undefined,
                            {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            },
                        )}
                    </p>

                    <h2
                        className="
                            mx-auto
                            mt-5
                            bg-gradient-to-r
                            from-cyan-200
                            via-violet-200
                            to-fuchsia-300
                            bg-clip-text
                            text-4xl
                            font-semibold
                            leading-[0.98]
                            tracking-[-0.055em]
                            text-transparent
                        "
                    >
                        {recap.journeyTitle}
                    </h2>

                    <div
                        className="
                            mx-auto
                            mt-7
                            h-1.5
                            w-1.5
                            rotate-45
                            bg-violet-300
                            shadow-[0_0_16px_rgba(196,181,253,0.8)]
                        "
                    />

                    <p
                        className="
                            mt-5
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-slate-600
                        "
                    >
                        You discovered as
                    </p>

                    <p
                        className="
                            mt-2
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.32em]
                            text-violet-200
                        "
                    >
                        The{" "}
                        {formatPersona(
                            recap.discoveryPersona,
                        )}
                    </p>
                </div>

                {/* Stats */}

                <div
                    className="
                        mt-14
                        grid
                        grid-cols-2
                        gap-x-6
                        gap-y-5
                    "
                >
                    <ShareStat
                        value={recap.explored}
                        label="Discovered"
                    />

                    <ShareStat
                        value={`${Math.round(
                            recap.likeRate,
                        )}%`}
                        label="Hit rate"
                    />

                    <ShareStat
                        value={recap.blindExplored}
                        label="Heard blind"
                    />

                    <ShareStat
                        value={`${Math.round(
                            recap.averageAdventureLevel,
                        )}%`}
                        label="Adventure"
                    />
                </div>

                {/* Quote */}

                <div
                    className="
                        mt-auto
                        text-center
                    "
                >
                    <p
                        className="
                            mx-auto
                            max-w-[280px]
                            text-sm
                            leading-6
                            text-slate-300
                        "
                    >
                        “{recap.recapMessage}”
                    </p>

                    <div
                        className="
                            mx-auto
                            mt-6
                            h-px
                            w-14
                            bg-gradient-to-r
                            from-transparent
                            via-violet-300/50
                            to-transparent
                        "
                    />

                    <p
                        className="
                            mt-5
                            text-[9px]
                            uppercase
                            tracking-[0.24em]
                            text-slate-600
                        "
                    >
                        Your taste. Your journey.
                    </p>
                </div>
            </div>
        </div>
    );
}

type ShareStatProps = {
    value: string | number;
    label: string;
};

function ShareStat({
                       value,
                       label,
                   }: ShareStatProps) {
    return (
        <div
            className="
                text-center
            "
        >
            <p
                className="
                    text-2xl
                    font-semibold
                    tracking-[-0.04em]
                    text-white
                "
            >
                {value}
            </p>

            <p
                className="
                    mt-1
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-slate-600
                "
            >
                {label}
            </p>
        </div>
    );
}