import {
    FiArrowUpRight,
} from "react-icons/fi";

type JourneyArchiveEmptyStateProps = {
    onDiscover: () => void;
};

export default function JourneyArchiveEmptyState({
                                                     onDiscover,
                                                 }: JourneyArchiveEmptyStateProps) {
    return (
        <div
            className="
                flex
                min-h-[360px]
                items-center
                justify-center
                px-6
                py-16
            "
        >
            <div
                className="
                    flex
                    max-w-md
                    flex-col
                    items-center
                    text-center
                "
            >
                {/* first trace */}

                <div
                    aria-hidden="true"
                    className="
                        relative
                        mb-8
                        h-16
                        w-28
                    "
                >
                    <div
                        className="
                            absolute
                            left-[8px]
                            top-1/2
                            h-px
                            w-[88px]
                            -translate-y-1/2
                            bg-gradient-to-r
                            from-transparent
                            via-violet-300/[0.16]
                            to-transparent
                        "
                    />

                    <div
                        className="
                            absolute
                            left-[30px]
                            top-[27px]
                            h-2
                            w-2
                            rotate-45
                            border
                            border-violet-300/25
                        "
                    />

                    <div
                        className="
                            absolute
                            right-[28px]
                            top-[27px]
                            h-2
                            w-2
                            rotate-45
                            border
                            border-cyan-300/20
                        "
                    />

                    <div
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            h-3
                            w-3
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-violet-300/20
                        "
                    >
                        <div
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                h-1
                                w-1
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-violet-300/50
                                shadow-[0_0_16px_rgba(196,181,253,0.28)]
                            "
                        />
                    </div>
                </div>

                <p
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.24em]
                        text-violet-300/55
                    "
                >
                    Your archive begins here
                </p>

                <h3
                    className="
                        mt-3
                        text-2xl
                        font-semibold
                        tracking-[-0.04em]
                        text-slate-100
                    "
                >
                    No journeys yet.
                </h3>

                <p
                    className="
                        mt-3
                        max-w-sm
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    Complete a Daily Discovery
                    and your first listening
                    journey will appear here.
                </p>

                <button
                    type="button"
                    onClick={onDiscover}
                    className="
                        group
                        mt-7
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-violet-300/[0.16]
                        bg-violet-300/[0.06]
                        px-5
                        py-2.5
                        text-xs
                        font-medium
                        text-violet-200
                        transition
                        hover:border-violet-300/[0.28]
                        hover:bg-violet-300/[0.10]
                    "
                >
                    Start discovering

                    <FiArrowUpRight
                        className="
                            transition-transform
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                        "
                    />
                </button>
            </div>
        </div>
    );
}