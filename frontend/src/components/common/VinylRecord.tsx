import { motion } from "framer-motion";

type VinylRecordProps = {
    size?: number;
};

export default function VinylRecord({ size = 120 }: VinylRecordProps) {

    const grooves = [0.92, 0.8, 0.68, 0.56, 0.44];

    return (

        <div className="relative" style={{ width: size, height: size }}>

            <motion.svg
                viewBox="0 0 200 200"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="h-full w-full drop-shadow-[0_0_30px_rgba(139,92,246,0.25)]"
            >

                <circle
                    cx="100"
                    cy="100"
                    r="98"
                    fill="#12161f"
                    stroke="rgba(255,255,255,0.08)"
                />

                {grooves.map((ratio) => (

                    <circle
                        key={ratio}
                        cx="100"
                        cy="100"
                        r={98 * ratio}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                    />

                ))}

                <defs>

                    <linearGradient id="vinylLabel" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>

                </defs>

                <circle cx="100" cy="100" r="34" fill="url(#vinylLabel)" />

                <circle cx="100" cy="100" r="5" fill="#0B0F17" />

            </motion.svg>

            {/* Glossy sheen — stays fixed while the disc spins underneath it */}
            <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                    background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, transparent 35%)",
                }}
            />

        </div>

    );

}