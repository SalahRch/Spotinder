import {
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    FiArrowLeft,
    FiShare2,
} from "react-icons/fi";

import {
    motion,
} from "framer-motion";

import {
    useJourney,
} from "@/features/discovery/hooks/useJourney";

import JourneyPersonaAtmosphere
    from "@/features/discovery/components/JourneyPersonaAtmosphere";

import JourneySharePreview
    from "@/features/discovery/components/JourneySharePreview";

import JourneyTrackRow
    from "@/features/discovery/components/JourneyTrackRow";

function formatPersona(
    persona: string,
) {
    return persona
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(
            /\b\w/g,
            (letter) =>
                letter.toUpperCase(),
        );
}

export default function JourneyDetailPage() {
    const {
        journeyId,
    } = useParams();

    const navigate =
        useNavigate();

    const [
        shareOpen,
        setShareOpen,
    ] = useState(false);

    const {
        data: journey,
        isLoading,
        isError,
    } = useJourney(
        journeyId,
    );

    if (isLoading) {
        return (
            <section
                className="
                    flex
                    min-h-[70vh]
                    items-center
                    justify-center
                    bg-[#0B0F17]
                    text-slate-500
                "
            >
                Loading journey...
            </section>
        );
    }

    if (
        isError ||
        !journey
    ) {
        return (
            <section
                className="
                    flex
                    min-h-[70vh]
                    items-center
                    justify-center
                    bg-[#0B0F17]
                    text-rose-300
                "
            >
                Couldn&apos;t load
                this journey.
            </section>
        );
    }

    return (
        <>
            <section
                className="
                     relative
        -m-6
        min-h-[calc(100vh+3rem)]
        overflow-hidden
        bg-[#0B0F17]
        text-white
                "
            >
                {/* ================= PERSONA ATMOSPHERE ================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        h-[520px]
                        overflow-hidden
                    "
                >
                    <JourneyPersonaAtmosphere
                        persona={
                            journey.discoveryPersona
                        }
                    />
                </div>

                {/* subtle fade so motif doesn't invade track list */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-[320px]
                        h-[260px]
                        bg-gradient-to-b
                        from-transparent
                        via-[#0B0F17]/75
                        to-[#0B0F17]
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        w-full
                        max-w-[1180px]
                        px-6
                        py-8
                        lg:px-10
                        lg:py-10
                    "
                >
                    {/* ================= TOP BAR ================= */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/app/journeys",
                                )
                            }
                            className="
                                group
                                flex
                                items-center
                                gap-2
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-slate-600
                                transition
                                hover:text-white
                            "
                        >
                            <FiArrowLeft
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:-translate-x-1
                                "
                            />

                            Journeys
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setShareOpen(
                                    true,
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-violet-300/[0.14]
                                bg-violet-300/[0.06]
                                px-4
                                py-2.5
                                text-xs
                                font-medium
                                text-violet-200
                                transition
                                hover:border-violet-300/[0.26]
                                hover:bg-violet-300/[0.11]
                            "
                        >
                            <FiShare2 />

                            Share Journey
                        </button>
                    </div>

                    {/* ================= HERO ================= */}

                    <motion.header
                        initial={{
                            opacity: 0,
                            y: 14,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            mx-auto
                            mt-9
                            max-w-[760px]
                            text-center
                        "
                    >
                        <p
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.28em]
                                text-violet-300/60
                            "
                        >
                            Discovery Journey
                        </p>

                        <p
                            className="
                                mt-2
                                text-[9px]
                                uppercase
                                tracking-[0.18em]
                                text-slate-700
                            "
                        >
                            {new Date(
                                `${journey.date}T00:00:00`,
                            ).toLocaleDateString(
                                undefined,
                                {
                                    month:
                                        "long",
                                    day:
                                        "numeric",
                                    year:
                                        "numeric",
                                },
                            )}
                        </p>

                        <h1
                            className="
                                mt-4
                                bg-gradient-to-r
                                from-cyan-100
                                via-white
                                to-violet-200
                                bg-clip-text
                                text-4xl
                                font-semibold
                                tracking-[-0.055em]
                                text-transparent
                                md:text-[50px]
                            "
                        >
                            {
                                journey.journeyTitle
                            }
                        </h1>

                        <div
                            className="
                                mt-4
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >
                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rotate-45
                                    bg-violet-300
                                    shadow-[0_0_12px_rgba(196,181,253,0.6)]
                                "
                            />

                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.28em]
                                    text-violet-300/75
                                "
                            >
                                The{" "}
                                {formatPersona(
                                    journey.discoveryPersona,
                                )}
                            </p>
                        </div>

                        <p
                            className="
                                mx-auto
                                mt-4
                                max-w-[560px]
                                text-sm
                                leading-6
                                text-slate-400
                            "
                        >
                            {
                                journey.recapMessage
                            }
                        </p>

                        {/* ================= INLINE STATS ================= */}

                        <div
                            className="
                                mt-7
                                flex
                                flex-wrap
                                items-center
                                justify-center
                                gap-x-5
                                gap-y-2
                                text-xs
                                text-slate-500
                            "
                        >
                            <InlineStat
                                value={
                                    journey.explored
                                }
                                label="explored"
                            />

                            <Divider />

                            <InlineStat
                                value={
                                    journey.liked
                                }
                                label="liked"
                            />

                            <Divider />

                            <InlineStat
                                value={`${Math.round(
                                    journey.likeRate,
                                )}%`}
                                label="hit"
                            />

                            <Divider />

                            <InlineStat
                                value={`${Math.round(
                                    journey.averageAdventureLevel,
                                )}%`}
                                label="adventure"
                            />
                        </div>
                    </motion.header>

                    {/* ================= DISCOVERIES ================= */}

                    <motion.div
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
                            mt-12
                        "
                    >
                        <div
                            className="
                                flex
                                items-end
                                justify-between
                                gap-5
                            "
                        >
                            <div>
                                <p
                                    className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.24em]
                                        text-violet-300/55
                                    "
                                >
                                    Your discoveries
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        text-2xl
                                        font-semibold
                                        tracking-[-0.045em]
                                        text-white
                                    "
                                >
                                    The songs that
                                    shaped this journey.
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        max-w-xl
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    A snapshot of what
                                    you heard, what you
                                    kept, and how far you
                                    wandered.
                                </p>
                            </div>

                            <span
                                className="
                                    hidden
                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-700
                                    sm:block
                                "
                            >
                                {
                                    journey.tracks.length
                                }{" "}
                                tracks
                            </span>
                        </div>

                        <div
                            className="
                                mt-6
                                overflow-hidden
                                rounded-[24px]
                                border
                                border-white/[0.06]
                                bg-[#0D141F]/72
                                shadow-[0_24px_70px_rgba(0,0,0,0.18)]
                                backdrop-blur-xl
                            "
                        >
                            {journey.tracks.map(
                                (
                                    track,
                                    index,
                                ) => (
                                    <JourneyTrackRow
                                        key={
                                            track.spotifyTrackId
                                        }
                                        track={
                                            track
                                        }
                                        index={
                                            index
                                        }
                                        isLast={
                                            index ===
                                            journey
                                                .tracks
                                                .length -
                                            1
                                        }
                                    />
                                ),
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <JourneySharePreview
                open={shareOpen}
                recap={journey}
                onClose={() =>
                    setShareOpen(
                        false,
                    )
                }
            />
        </>
    );
}

/* =========================================================
   INLINE STATS
   ========================================================= */

type InlineStatProps = {
    value: string | number;
    label: string;
};

function InlineStat({
                        value,
                        label,
                    }: InlineStatProps) {
    return (
        <div
            className="
                flex
                items-baseline
                gap-1.5
            "
        >
            <span
                className="
                    font-semibold
                    text-slate-200
                "
            >
                {value}
            </span>

            <span
                className="
                    text-slate-600
                "
            >
                {label}
            </span>
        </div>
    );
}

function Divider() {
    return (
        <span
            aria-hidden="true"
            className="
                hidden
                h-1
                w-1
                rounded-full
                bg-violet-300/30
                sm:block
            "
        />
    );
}