import {
    useMemo,
    useState,
} from "react";

import {
    FiSearch,
    FiSliders,
} from "react-icons/fi";


import type {
    LikedSong,
} from "../types/likes";

import LikesHero from "../components/LikesHero";
import LikedSongRow from "../components/LikedSongRow";
import CreatePlaylistModal from "@/features/playlists/components/CreatePlaylistModal";
import { useLikes } from "../hooks/useLikes";
import {usePlayer} from "@/features/player/context/SpotifyPlayerContext.tsx";

export default function LikesPage() {
    const {
        data: likedSongs = [],
        isLoading,
        isError,
    } = useLikes();

    const player =
        usePlayer();

    const handleTogglePlayback = async (
        song: LikedSong,
    ) => {
        await player.toggleTrack(
            song,
            "likes",
        );
    };

    const [
        createPlaylistOpen,
        setCreatePlaylistOpen,
    ] = useState(false);

    const [search, setSearch] =
        useState("");

    const filteredSongs =
        useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return likedSongs;
            }

            return likedSongs.filter(
                (song) =>
                    song.title
                        .toLowerCase()
                        .includes(query) ||
                    song.artist
                        .toLowerCase()
                        .includes(query),
            );
        }, [
            likedSongs,
            search,
        ]);

    if (isLoading) {
        return (
            <section
                className="
                    relative
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#0B0F17]
                    text-white
                "
            >
                <div className="text-center">
                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-2
                            border-white/10
                            border-t-violet-400
                        "
                    />

                    <p className="mt-5 text-sm text-slate-400">
                        Loading your collection...
                    </p>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-[#0B0F17]
                    px-6
                    text-center
                    text-white
                "
            >
                <div>
                    <h2 className="text-2xl font-semibold">
                        We couldn&apos;t load your likes.
                    </h2>

                    <p className="mt-3 text-sm text-slate-400">
                        Try refreshing the page.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#0B0F17]
                text-white
            "
        >
            {/* Background atmosphere */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-[15%]
                    top-[-180px]
                    h-[520px]
                    w-[520px]
                    rounded-full
                    bg-cyan-400/[0.04]
                    blur-[150px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[5%]
                    top-[120px]
                    h-[620px]
                    w-[620px]
                    rounded-full
                    bg-violet-500/[0.05]
                    blur-[170px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-[1280px]
                    px-6
                    py-10
                    lg:px-10
                    lg:py-12
                "
            >
                {/* Hero */}

                <LikesHero
                    songs={likedSongs}
                    onCreatePlaylist={() => {
                        setCreatePlaylistOpen(
                            true,
                        );
                    }}
                />

                {/* Collection header */}

                <div
                    className="
                        mt-10
                        flex
                        flex-col
                        gap-5
                        md:flex-row
                        md:items-end
                        md:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-[0.25em]
                                text-violet-300/65
                            "
                        >
                            Recently liked
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
                            Your discoveries
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-500
                            "
                        >
                            {filteredSongs.length}
                            {" "}
                            {filteredSongs.length === 1
                                ? "song"
                                : "songs"}
                        </p>
                    </div>

                    {/* Toolbar */}

                    <div
                        className="
                            flex
                            w-full
                            flex-col
                            gap-3
                            sm:flex-row
                            md:w-auto
                        "
                    >
                        {/* Search */}

                        <div
                            className="
                                group
                                flex
                                h-11
                                min-w-0
                                items-center
                                gap-3
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                px-4
                                backdrop-blur-xl
                                transition
                                duration-300
                                focus-within:border-violet-400/30
                                focus-within:bg-white/[0.05]
                                sm:w-[280px]
                            "
                        >
                            <FiSearch
                                className="
                                    shrink-0
                                    text-slate-500
                                    transition
                                    group-focus-within:text-violet-300
                                "
                            />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value,
                                    )
                                }
                                placeholder="Search your likes..."
                                className="
                                    min-w-0
                                    flex-1
                                    bg-transparent
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-slate-600
                                "
                            />
                        </div>

                        {/* Sort button placeholder */}

                        <button
                            type="button"
                            className="
                                flex
                                h-11
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                px-4
                                text-sm
                                text-slate-400
                                backdrop-blur-xl
                                transition
                                duration-300
                                hover:border-white/15
                                hover:bg-white/[0.06]
                                hover:text-white
                            "
                        >
                            <FiSliders />

                            Recent
                        </button>
                    </div>
                </div>

                {/* Divider */}

                <div
                    className="
                        my-6
                        h-px
                        bg-gradient-to-r
                        from-white/[0.08]
                        via-white/[0.04]
                        to-transparent
                    "
                />

                {/* Collection */}

                {filteredSongs.length > 0 ? (
                    <div
                        className="
                            space-y-1
                        "
                    >
                        {filteredSongs.map(
                            (
                                song,
                                index,
                            ) => (
                                <LikedSongRow
                                    key={song.id}
                                    song={song}
                                    index={index}
                                    isPlaying={
                                        player.currentTrack?.id ===
                                        song.id &&
                                        player.isPlaying
                                    }
                                    onPlay={
                                        handleTogglePlayback
                                    }
                                />
                            ),
                        )}
                    </div>
                ) : (
                    <div
                        className="
                            flex
                            min-h-[320px]
                            items-center
                            justify-center
                            rounded-[28px]
                            border
                            border-white/[0.06]
                            bg-white/[0.02]
                            p-10
                            text-center
                        "
                    >
                        <div>
                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-white/[0.07]
                                    bg-white/[0.03]
                                    text-xl
                                "
                            >
                                🎵
                            </div>

                            <h3
                                className="
                                    mt-5
                                    text-lg
                                    font-medium
                                    text-slate-200
                                "
                            >
                                No matches found
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Try another song or artist.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <CreatePlaylistModal
                open={createPlaylistOpen}
                songCount={likedSongs.length}
                onClose={() => {
                    setCreatePlaylistOpen(
                        false,
                    );
                }}
            />
        </section>

    );
}