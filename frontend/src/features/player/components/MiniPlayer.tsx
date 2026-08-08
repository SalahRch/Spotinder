import { useLocation } from "react-router-dom";

import DiscoverNowPlaying from "./DiscoverNowPlaying";
import HorizontalMiniPlayer from "./HorizontalMiniPlayer";
import { usePlayer } from "@/features/player/context/SpotifyPlayerContext";

export default function MiniPlayer() {
    const location = useLocation();

    const player = usePlayer();

    if (
        player.playbackSource !== "likes"
    ) {
        return null;
    }

    const isDiscoverPage =
        location.pathname ===
        "/app/discover";

    if (isDiscoverPage) {
        return (
            <DiscoverNowPlaying />
        );
    }

    return (
        <HorizontalMiniPlayer />
    );
}