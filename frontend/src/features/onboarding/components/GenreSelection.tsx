import {
    useState,
} from "react";

import {
    motion,
} from "framer-motion";

import {
    FiCheck,
    FiArrowRight,
} from "react-icons/fi";

import {
    useSaveGenres,
} from "../hooks/useSaveGenres";

type GenreSelectionProps = {
    onComplete: () => void;
};

const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Electronic",
    "Indie",
    "Metal",
    "Jazz",
    "Latin",
    "Classical",
    "Reggae",
    "Afrobeats",
];

export default function GenreSelection({
                                           onComplete,
                                       }: GenreSelectionProps) {
    const [
        selected,
        setSelected,
    ] = useState<string[]>([]);

    const saveGenres =
        useSaveGenres();

    const toggleGenre = (
        genre: string,
    ) => {
        setSelected(
            current => {
                if (
                    current.includes(
                        genre,
                    )
                ) {
                    return current.filter(
                        item =>
                            item !== genre,
                    );
                }

                if (
                    current.length >= 3
                ) {
                    return current;
                }

                return [
                    ...current,
                    genre,
                ];
            },
        );
    };

    const handleContinue =
        async () => {
            if (
                selected.length !== 3
            ) {
                return;
            }

            await saveGenres.mutateAsync(
                selected,
            );

            onComplete();
        };

    return (
        <section
            className="
                mx-auto
                flex
                w-full
                max-w-[860px]
                flex-col
                items-center
            "
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 16,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.45,
                }}
                className="
                    mb-10
                    max-w-[650px]
                    text-center
                "
            >
                <div
                    className="
                        mb-4
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        text-violet-300
                    "
                >
                    Build your taste
                </div>

                <h1
                    className="
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-white
                        md:text-5xl
                    "
                >
                    Pick 3 sounds
                    you love
                </h1>

                <p
                    className="
                        mx-auto
                        mt-4
                        max-w-[540px]
                        text-base
                        leading-7
                        text-white/55
                    "
                >
                    Your Spotify history
                    is still a little quiet,
                    so give Spotinder a
                    starting point.
                </p>
            </motion.div>

            <div
                className="
                    mb-8
                    grid
                    w-full
                    grid-cols-2
                    gap-3
                    sm:grid-cols-3
                    md:grid-cols-4
                "
            >
                {genres.map(
                    (
                        genre,
                        index,
                    ) => {
                        const isSelected =
                            selected.includes(
                                genre,
                            );

                        return (
                            <motion.button
                                key={
                                    genre
                                }
                                type="button"
                                initial={{
                                    opacity:
                                        0,
                                    y: 12,
                                }}
                                animate={{
                                    opacity:
                                        1,
                                    y: 0,
                                }}
                                transition={{
                                    delay:
                                        index *
                                        0.035,
                                }}
                                whileHover={{
                                    y: -3,
                                }}
                                whileTap={{
                                    scale:
                                        0.97,
                                }}
                                onClick={() =>
                                    toggleGenre(
                                        genre,
                                    )
                                }
                                className={`
                                    relative
                                    flex
                                    min-h-[76px]
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    px-5
                                    text-left
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200

                                    ${
                                    isSelected
                                        ? `
                                                border-violet-400/60
                                                bg-violet-500/15
                                                text-white
                                                shadow-[0_0_35px_rgba(139,92,246,0.12)]
                                            `
                                        : `
                                                border-white/[0.08]
                                                bg-white/[0.035]
                                                text-white/65
                                                hover:border-white/[0.16]
                                                hover:bg-white/[0.055]
                                                hover:text-white
                                            `
                                }
                                `}
                            >
                                <span>
                                    {
                                        genre
                                    }
                                </span>

                                {isSelected && (
                                    <span
                                        className="
                                            flex
                                            h-6
                                            w-6
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-violet-400
                                            text-[#0B0F17]
                                        "
                                    >
                                        <FiCheck
                                            size={
                                                14
                                            }
                                        />
                                    </span>
                                )}
                            </motion.button>
                        );
                    },
                )}
            </div>

            <div
                className="
                    flex
                    w-full
                    flex-col
                    items-center
                    justify-between
                    gap-5
                    border-t
                    border-white/[0.06]
                    pt-6
                    sm:flex-row
                "
            >
                <div
                    className="
                        text-sm
                        text-white/45
                    "
                >
                    <span
                        className="
                            font-semibold
                            text-white
                        "
                    >
                        {
                            selected.length
                        }
                    </span>
                    /3 selected
                </div>

                <button
                    type="button"
                    disabled={
                        selected.length !==
                        3 ||
                        saveGenres.isPending
                    }
                    onClick={
                        handleContinue
                    }
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-white
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-[#0B0F17]
                        transition
                        hover:bg-white/90
                        disabled:cursor-not-allowed
                        disabled:opacity-35
                    "
                >
                    {saveGenres.isPending
                        ? "Saving..."
                        : "Continue"}

                    {!saveGenres.isPending && (
                        <FiArrowRight />
                    )}
                </button>
            </div>

            {saveGenres.isError && (
                <p
                    className="
                        mt-5
                        text-sm
                        text-rose-300
                    "
                >
                    Couldn&apos;t save
                    your genres. Try
                    again.
                </p>
            )}
        </section>
    );
}