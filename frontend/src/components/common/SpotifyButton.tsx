import { FiArrowRight } from "react-icons/fi";

export default function SpotifyButton() {
    return (
        <button
            className="
      group
      inline-flex
      items-center
      gap-3
      rounded-full
      border
      border-white/10
      bg-white/5
      px-10
      py-4
      text-base
      font-medium
      text-white
      backdrop-blur-md
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-violet-400/40
      hover:bg-white/10
      hover:shadow-[0_0_40px_rgba(139,92,246,0.20)]
    "
        >
            Start Discovering

            <FiArrowRight
                className="
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
            />
        </button>
    );
}