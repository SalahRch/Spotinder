import type {
    DailyDiscoveryRecap,
} from "../types/discovery";
import JourneyConstellation from "@/features/discovery/components/JourneyConstellation.tsx";
import {useJourneyAlbumColors} from "@/features/discovery/hooks/useJourneyAlbumColors.ts";
import {pickJourneyAuraColors} from "@/features/discovery/utils/journeyPalette.ts";

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



    const albumColors =
        useJourneyAlbumColors(
            recap.tracks ?? [],
        );

    const [
        primaryAura,
        secondaryAura,
    ] = pickJourneyAuraColors(
        Object.values(albumColors),
    );


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
                style={{
                    backgroundColor:
                    primaryAura,
                }}
                className="
                    pointer-events-none
                    absolute
                    -left-28
                    top-16
                    h-[320px]
                    w-[320px]
                    rounded-full
                    opacity-[0.16]
                    blur-[120px]
                "
            />

            <div
                aria-hidden="true"
                style={{
                    backgroundColor:
                    secondaryAura,
                }}
                className="
                    pointer-events-none
                    absolute
                    -right-28
                    bottom-24
                    h-[320px]
                    w-[320px]
                    rounded-full
                    opacity-[0.14]
                    blur-[120px]
                "
            />

            {/* Persona motif */}


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
                        mt-5
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
        relative
        mx-auto
        mt-5
        flex
        h-[170px]
        w-full
        items-center
        justify-center
    "
                    >
                        <JourneyConstellation
                            recap={recap}
                            albumColors={albumColors}
                        />

                        <div
                            className="
            relative
            z-10
            text-center
        "
                        >
                            <p
                                className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-slate-500
            "
                            >
                                You discovered as
                            </p>

                            <p
                                className="
                mt-3
                bg-gradient-to-r
                from-cyan-200
                via-violet-200
                to-fuchsia-200
                bg-clip-text
                text-lg
                font-semibold
                uppercase
                tracking-[0.3em]
                text-transparent
            "
                            >
                                The{" "}
                                {formatPersona(
                                    recap.discoveryPersona,
                                )}
                            </p>

                            <p
                                className="
            mt-3
            text-[8px]
            uppercase
            tracking-[0.22em]
            text-slate-600
        "
                            >
                                {recap.explored} songs shaped this journey
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}

                <div
                    className="
        mt-7
        grid
        grid-cols-2
        gap-8
    "
                >
                    <ShareStat
                        value={`${Math.round(
                            recap.likeRate,
                        )}%`}
                        label="Hit rate"
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
                        mt-10
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
                        {recap.recapMessage}
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