import type {
    OnboardingProfile,
} from "../types/onboarding";

type DiscoveryProfileProps = {
    profile: OnboardingProfile;
    onContinue: () => void;
};

export default function DiscoveryProfile({
                                             profile,
                                             onContinue,
                                         }: DiscoveryProfileProps) {
    return (
        <div
            className="
                mx-auto
                w-full
                max-w-[900px]
                text-center
            "
        >
            <p
                className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-violet-300/70
                "
            >
                Your discovery profile
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
                We found your sound.
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
                This is the listening world
                Spotinder will use as your
                starting point.
            </p>

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    md:grid-cols-[1fr_1.2fr]
                "
            >
                {/* Artists */}

                <div
                    className="
                        rounded-[28px]
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        p-6
                        text-left
                    "
                >
                    <p
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-violet-300/70
                        "
                    >
                        Artists in your rotation
                    </p>

                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            gap-2
                        "
                    >
                        {profile.topArtists.map(
                            (artist) => (
                                <span
                                    key={artist}
                                    className="
                                        rounded-full
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.03]
                                        px-4
                                        py-2
                                        text-xs
                                        text-slate-300
                                    "
                                >
                                    {artist}
                                </span>
                            ),
                        )}
                    </div>

                    <div
                        className="
                            mt-8
                            border-t
                            border-white/[0.06]
                            pt-6
                        "
                    >
                        <p
                            className="
                                text-3xl
                                font-semibold
                                text-white
                            "
                        >
                            {profile.songsAnalyzed}
                        </p>

                        <p
                            className="
                                mt-1
                                text-[9px]
                                uppercase
                                tracking-[0.18em]
                                text-slate-600
                            "
                        >
                            Songs analyzed
                        </p>
                    </div>
                </div>

                {/* Tracks */}

                <div
                    className="
                        rounded-[28px]
                        border
                        border-white/[0.06]
                        bg-[#0E1520]/75
                        p-6
                        text-left
                    "
                >
                    <p
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-cyan-300/70
                        "
                    >
                        A glimpse of your sound
                    </p>

                    <div
                        className="
                            mt-5
                            grid
                            grid-cols-5
                            gap-3
                        "
                    >
                        {profile.topTracks.map(
                            (track) => (
                                <div
                                    key={
                                        track.spotifyTrackId
                                    }
                                    className="
                                        overflow-hidden
                                        rounded-[16px]
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.03]
                                    "
                                >
                                    {track.albumImage ? (
                                        <img
                                            src={
                                                track.albumImage
                                            }
                                            alt=""
                                            className="
                                                aspect-square
                                                w-full
                                                object-cover
                                            "
                                        />
                                    ) : (
                                        <div
                                            className="
                                                aspect-square
                                                w-full
                                                bg-white/[0.04]
                                            "
                                        />
                                    )}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={onContinue}
                className="
                    mt-10
                    rounded-full
                    border
                    border-violet-400/20
                    bg-violet-400/[0.10]
                    px-7
                    py-3
                    text-sm
                    font-medium
                    text-violet-100
                    transition
                    hover:bg-violet-400/[0.16]
                "
            >
                Continue
            </button>
        </div>
    );
}