import { FiArrowRight } from "react-icons/fi";
import Magnetic from "./Magnetic";

type SpotifyButtonProps = {
    small?: boolean;
    onClick?: () => void;
    disabled?: boolean;
};

export default function SpotifyButton({
                                          small = false,
                                          onClick,
                                          disabled = false,
                                      }: SpotifyButtonProps) {
    return (
        <Magnetic>
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={`
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-md
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-violet-400/40
                    hover:bg-white/10
                    hover:shadow-[0_0_40px_rgba(139,92,246,0.20)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${
                    small
                        ? "px-6 py-3 text-sm"
                        : "px-10 py-4 text-base"
                }
                `}
            >
                {disabled ? "Checking session..." : "Start Discovering"}

                <FiArrowRight
                    className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />
            </button>
        </Magnetic>
    );
}