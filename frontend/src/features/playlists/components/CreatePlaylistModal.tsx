import {
    useState,
} from "react";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    FiCheck,
    FiExternalLink,
    FiMusic,
    FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";

import { useCreatePlaylist } from "../hooks/useCreatePlaylist";

import type {
    PlaylistResponse,
} from "../types/playlists";

type CreatePlaylistModalProps = {
    open: boolean;
    songCount: number;

    onClose: () => void;
};

export default function CreatePlaylistModal({
                                                open,
                                                songCount,
                                                onClose,
                                            }: CreatePlaylistModalProps) {
    const [name, setName] =
        useState("Spotinder Discoveries");

    const [
        createdPlaylist,
        setCreatedPlaylist,
    ] =
        useState<PlaylistResponse | null>(
            null,
        );

    const createPlaylist =
        useCreatePlaylist();

    const resetModal = () => {
        setCreatedPlaylist(null);
        setName(
            "Spotinder Discoveries",
        );
    };

    const handleClose = () => {
        resetModal();
        onClose();
    };

    const handleCreate =
        async () => {
            const trimmedName =
                name.trim();

            if (!trimmedName) {
                toast.error(
                    "Give your playlist a name.",
                );

                return;
            }

            try {
                const playlist =
                    await createPlaylist.mutateAsync({
                        name: trimmedName,
                    });

                setCreatedPlaylist(
                    playlist,
                );

                toast.success(
                    "Playlist created on Spotify.",
                );
            } catch (error) {
                console.error(
                    "Unable to create playlist:",
                    error,
                );

                toast.error(
                    "We couldn't create your playlist.",
                );
            }
        };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="
                        fixed
                        inset-0
                        z-[200]
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        px-6
                        backdrop-blur-md
                    "
                    onMouseDown={
                        handleClose
                    }
                >
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
                            y: 18,
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        onMouseDown={(
                            event,
                        ) => {
                            event.stopPropagation();
                        }}
                        className="
                            relative
                            w-full
                            max-w-[460px]
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/[0.09]
                            bg-[#111827]/95
                            p-7
                            shadow-[0_40px_140px_rgba(0,0,0,0.65)]
                            backdrop-blur-2xl
                        "
                    >
                        {/* Glow */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                -right-24
                                -top-24
                                h-64
                                w-64
                                rounded-full
                                bg-violet-500/15
                                blur-[85px]
                            "
                        />

                        <div className="relative z-10">
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={
                                    handleClose
                                }
                                className="
                                    absolute
                                    right-0
                                    top-0
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-slate-500
                                    transition
                                    hover:bg-white/[0.06]
                                    hover:text-white
                                "
                            >
                                <FiX />
                            </button>

                            {!createdPlaylist ? (
                                <>
                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-violet-400/20
                                            bg-violet-400/[0.08]
                                            text-violet-300
                                        "
                                    >
                                        <FiMusic />
                                    </div>

                                    <p
                                        className="
                                            mt-6
                                            text-xs
                                            font-medium
                                            uppercase
                                            tracking-[0.24em]
                                            text-violet-300/70
                                        "
                                    >
                                        Create playlist
                                    </p>

                                    <h2
                                        className="
                                            mt-2
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            text-white
                                        "
                                    >
                                        Turn your likes
                                        into a playlist.
                                    </h2>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            leading-6
                                            text-slate-400
                                        "
                                    >
                                        We&apos;ll add all{" "}
                                        <span className="text-slate-200">
                                            {songCount}
                                        </span>{" "}
                                        of your liked
                                        discoveries to a
                                        new Spotify playlist.
                                    </p>

                                    <label
                                        className="
                                            mt-7
                                            block
                                            text-xs
                                            font-medium
                                            text-slate-400
                                        "
                                    >
                                        Playlist name
                                    </label>

                                    <input
                                        autoFocus
                                        value={name}
                                        maxLength={100}
                                        onChange={(
                                            event,
                                        ) => {
                                            setName(
                                                event
                                                    .target
                                                    .value,
                                            );
                                        }}
                                        onKeyDown={(
                                            event,
                                        ) => {
                                            if (
                                                event.key ===
                                                "Enter"
                                            ) {
                                                void handleCreate();
                                            }
                                        }}
                                        className="
                                            mt-2
                                            h-12
                                            w-full
                                            rounded-2xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.035]
                                            px-4
                                            text-sm
                                            text-white
                                            outline-none
                                            transition
                                            placeholder:text-slate-600
                                            focus:border-violet-400/35
                                            focus:bg-white/[0.05]
                                            focus:shadow-[0_0_30px_rgba(139,92,246,0.07)]
                                        "
                                        placeholder="My Spotinder discoveries"
                                    />

                                    <button
                                        type="button"
                                        disabled={
                                            createPlaylist.isPending ||
                                            !name.trim()
                                        }
                                        onClick={() => {
                                            void handleCreate();
                                        }}
                                        className="
                                            mt-6
                                            flex
                                            h-12
                                            w-full
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-white
                                            text-sm
                                            font-semibold
                                            text-slate-950
                                            transition
                                            duration-300
                                            hover:-translate-y-0.5
                                            hover:shadow-[0_14px_40px_rgba(255,255,255,0.10)]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                            disabled:hover:translate-y-0
                                        "
                                    >
                                        {createPlaylist.isPending
                                            ? "Creating playlist..."
                                            : `Create with ${songCount} songs`}
                                    </button>
                                </>
                            ) : (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 12,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="py-3"
                                >
                                    <div
                                        className="
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-emerald-400/20
                                            bg-emerald-400/[0.08]
                                            text-xl
                                            text-emerald-300
                                        "
                                    >
                                        <FiCheck />
                                    </div>

                                    <h2
                                        className="
                                            mt-6
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            text-white
                                        "
                                    >
                                        Playlist ready.
                                    </h2>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            leading-6
                                            text-slate-400
                                        "
                                    >
                                        <span className="font-medium text-slate-200">
                                            {
                                                createdPlaylist.name
                                            }
                                        </span>{" "}
                                        now contains{" "}
                                        {
                                            createdPlaylist
                                                .tracks
                                                .length
                                        }{" "}
                                        discoveries.
                                    </p>

                                    <a
                                        href={
                                            createdPlaylist.spotifyUrl
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            mt-7
                                            flex
                                            h-12
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-2xl
                                            bg-white
                                            text-sm
                                            font-semibold
                                            text-slate-950
                                            transition
                                            hover:-translate-y-0.5
                                        "
                                    >
                                        Open in Spotify

                                        <FiExternalLink />
                                    </a>

                                    <button
                                        type="button"
                                        onClick={
                                            handleClose
                                        }
                                        className="
                                            mt-3
                                            h-11
                                            w-full
                                            rounded-2xl
                                            text-sm
                                            text-slate-500
                                            transition
                                            hover:bg-white/[0.04]
                                            hover:text-white
                                        "
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}