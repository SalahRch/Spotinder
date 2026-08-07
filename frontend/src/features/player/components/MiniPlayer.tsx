import { useLocation } from "react-router-dom";

import DiscoverNowPlaying from "./DiscoverNowPlaying";
import HorizontalMiniPlayer from "./HorizontalMiniPlayer";

export default function MiniPlayer() {
    const location = useLocation();

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