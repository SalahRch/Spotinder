import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    toPng,
} from "html-to-image";

import {
    FiDownload,
    FiShare2,
    FiX,
} from "react-icons/fi";

import JourneyShareCard from "./JourneyShareCard";

import type {
    DailyDiscoveryRecap,
} from "../types/discovery";
import {useRef, useState, useEffect} from "react";

type JourneySharePreviewProps = {
    open: boolean;
    recap?: DailyDiscoveryRecap;
    onClose: () => void;
};

export default function JourneySharePreview({
                                                open,
                                                recap,
                                                onClose,
                                            }: JourneySharePreviewProps) {


    const cardRef =
        useRef<HTMLDivElement>(
            null,
        );

    const [
        action,
        setAction,
    ] = useState<
        "share" | "download" | null
    >(null);

    const busy =
        action !== null;

    const createJourneyImage =
        async () => {
            if (!cardRef.current) {
                return null;
            }

            const dataUrl =
                await toPng(
                    cardRef.current,
                    {
                        pixelRatio: 3,
                        cacheBust: true,
                        backgroundColor:
                            "#070C14",
                    },
                );

            return dataUrl;
        };

    const handleDownload =
        async () => {
            if (
                !recap ||
                busy
            ) {
                return;
            }

            try {
                setAction(
                    "download"
                );

                const dataUrl =
                    await createJourneyImage();

                if (!dataUrl) {
                    return;
                }

                const slug =
                    recap.journeyTitle
                        .toLowerCase()
                        .trim()
                        .replace(
                            /[^a-z0-9]+/g,
                            "-",
                        )
                        .replace(
                            /^-|-$/g,
                            "",
                        );

                const link =
                    document.createElement(
                        "a",
                    );

                link.download =
                    `spotinder-${slug}.png`;

                link.href =
                    dataUrl;

                link.click();
            } catch (error) {
                console.error(
                    "Unable to export journey:",
                    error,
                );
            } finally {
                setAction(
                    null
                );
            }
        };

    const handleShare =
        async () => {
            if (
                !recap ||
                busy
            ) {
                return;
            }

            try {
                setAction(
                    "share"
                );

                const dataUrl =
                    await createJourneyImage();

                if (!dataUrl) {
                    return;
                }

                const blob =
                    await (
                        await fetch(
                            dataUrl,
                        )
                    ).blob();

                const file =
                    new File(
                        [
                            blob,
                        ],
                        "spotinder-journey.png",
                        {
                            type:
                                "image/png",
                        },
                    );

                if (
                    navigator.share &&
                    navigator.canShare?.({
                        files: [
                            file,
                        ],
                    })
                ) {
                    await navigator.share({
                        title:
                        recap.journeyTitle,

                        text:
                            `My Spotinder journey: ${recap.journeyTitle} — The ${recap.discoveryPersona.toLowerCase()}.`,

                        files: [
                            file,
                        ],
                    });

                    return;
                }

                /*
                 * Desktop fallback:
                 * download the poster instead.
                 */

                const link =
                    document.createElement(
                        "a",
                    );

                link.download =
                    "spotinder-journey.png";

                link.href =
                    dataUrl;

                link.click();
            } catch (error) {
                /*
                 * User cancelling the native
                 * share sheet isn't really
                 * an application error.
                 */
                if (
                    error instanceof DOMException &&
                    error.name ===
                    "AbortError"
                ) {
                    return;
                }

                console.error(
                    "Unable to share journey:",
                    error,
                );
            } finally {
                setAction(
                    null
                );
            }
        };

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (
                event.key === "Escape" &&
                !busy
            ) {
                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        open,
        busy,
        onClose,
    ]);


    return (
        <AnimatePresence>
            {open && recap && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        fixed
                        inset-0
                        z-[120]
                        flex
                        items-center
                        justify-center
                        overflow-y-auto
                        bg-[#050810]/90
                        px-4
                        py-10
                        backdrop-blur-2xl
                        sm:px-6
                    "
                >
                    <button
                        type="button"
                        aria-label="Close share preview"
                        disabled={busy}
                        onClick={onClose}
                        className="
        fixed
        right-5
        top-5
        z-20
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/[0.08]
        bg-white/[0.04]
        text-slate-400
        backdrop-blur-xl
        transition
        hover:border-white/[0.14]
        hover:bg-white/[0.08]
        hover:text-white
        disabled:cursor-wait
        disabled:opacity-40
        sm:right-6
        sm:top-6
    "
                    >
                        <FiX />
                    </button>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 24,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 12,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
        flex
        w-full
        flex-col
        items-center
    "
                    >
                        <JourneyShareCard
                            ref={cardRef}
                            recap={recap}
                        />

                        <div
                            className="
            mt-6
            flex
            w-full
            max-w-[390px]
            items-center
            gap-3
        "
                        >
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                    void handleShare();
                                }}
                                className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-violet-300/[0.20]
                bg-violet-300/[0.10]
                px-5
                py-3
                text-sm
                font-medium
                text-violet-100
                transition
                duration-200
                hover:border-violet-300/[0.32]
                hover:bg-violet-300/[0.15]
                active:scale-[0.98]
                disabled:cursor-wait
                disabled:opacity-50
            "
                            >
                                <FiShare2 />

                                {action === "share"
                                    ? "Preparing..."
                                    : "Share"}
                            </button>

                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                    void handleDownload();
                                }}
                                className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-5
                py-3
                text-sm
                font-medium
                text-slate-300
                transition
                duration-200
                hover:border-white/[0.14]
                hover:bg-white/[0.06]
                hover:text-white
                active:scale-[0.98]
                disabled:cursor-wait
                disabled:opacity-50
            "
                            >
                                <FiDownload />

                                {action === "download"
                                    ? "Preparing..."
                                    : "Download"}
                            </button>
                        </div>

                        <p
                            className="
            mt-3
            text-center
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-slate-600
        "
                        >
                            Your journey, ready to share
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}