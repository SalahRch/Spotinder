import { useEffect, useRef } from "react";

type SpotifyEmbedTestProps = {
    trackId: string;
};

export default function SpotifyEmbedTest({
                                             trackId,
                                         }: SpotifyEmbedTestProps) {
    const containerRef =
        useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const createEmbed = (
            IFrameAPI: any,
        ) => {
            if (!containerRef.current) {
                return;
            }

            containerRef.current.innerHTML = "";

            const options = {
                width: "100%",
                height: "152",
                uri: `spotify:track:${trackId}`,
                theme: "dark",
            };

            IFrameAPI.createController(
                containerRef.current,
                options,
                () => {
                    console.log(
                        "Spotify Embed ready",
                    );
                },
            );
        };

        // API already loaded
        if (
            (window as any)
                .SpotifyIframeApi
        ) {
            createEmbed(
                (window as any)
                    .SpotifyIframeApi,
            );

            return;
        }

        (window as any)
            .onSpotifyIframeApiReady = (
            IFrameAPI: any,
        ) => {
            (window as any)
                .SpotifyIframeApi =
                IFrameAPI;

            createEmbed(IFrameAPI);
        };

        const existingScript =
            document.querySelector(
                'script[src="https://open.spotify.com/embed/iframe-api/v1"]',
            );

        if (!existingScript) {
            const script =
                document.createElement(
                    "script",
                );

            script.src =
                "https://open.spotify.com/embed/iframe-api/v1";

            script.async = true;

            document.body.appendChild(
                script,
            );
        }
    }, [trackId]);

    return (
        <div
            className="
                w-full
                overflow-hidden
                rounded-2xl
            "
        >
            <div ref={containerRef} />
        </div>
    );
}