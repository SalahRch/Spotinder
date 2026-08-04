import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiHeadphones, FiMic, FiActivity, FiArrowRight } from "react-icons/fi";

import StepDots from "../../components/common/StepDots";
import AuroraText from "../../components/animations/AuroraText";
import Magnetic from "../../components/common/Magnetic";
import TiltCard from "../../components/common/TiltCard";
import TasteEqualizer from "../../components/common/TasteEqualizer";
import { staggerContainer, staggerItem } from "../../assets/motionVariants";

const STATS = [
    { icon: FiActivity, label: "Alternative Rock", sub: "Top genre" },
    { icon: FiMic, label: "Arctic Monkeys", sub: "Top artist" },
];

function useCountUp(target: number, durationMs = 1200) {

    const [value, setValue] = useState(0);

    useEffect(() => {

        const start = performance.now();

        function tick(now: number) {

            const progress = Math.min((now - start) / durationMs, 1);

            setValue(Math.floor(progress * target));

            if (progress < 1) requestAnimationFrame(tick);

        }

        requestAnimationFrame(tick);

    }, [target, durationMs]);

    return value;

}

const CARD_CLASS = `
    flex
    items-center
    gap-4
    rounded-2xl
    border
    border-white/10
    bg-white/5
    px-5
    py-4
    text-left
    backdrop-blur-md
    transition-colors
    hover:border-cyan-400/30
`;

const ICON_BADGE_CLASS = `
    flex
    h-11
    w-11
    shrink-0
    items-center
    justify-center
    rounded-xl
    bg-gradient-to-br
    from-cyan-400/20
    to-fuchsia-500/20
    text-cyan-300
`;

export default function DiscoveryProfilePage() {

    const navigate = useNavigate();

    const songsAnalyzed = useCountUp(1247);

    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
        >

            <motion.div variants={staggerItem}>
                <StepDots total={3} current={1} />
            </motion.div>

            <motion.h2
                variants={staggerItem}
                className="text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl"
            >
                Your <AuroraText>discovery profile</AuroraText>
            </motion.h2>

            <motion.p variants={staggerItem} className="mt-4 text-slate-400">
                Here's what we learned about your taste.
            </motion.p>

            <motion.div variants={staggerItem} className="mt-6">

                <TasteEqualizer />

            </motion.div>

            <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-3">

                {STATS.map(({ icon: Icon, label, sub }, index) => (

                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.5 + index * 0.15,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >

                        <TiltCard className={CARD_CLASS}>

                            <span className={ICON_BADGE_CLASS}>

                                <Icon className="text-lg" />

                            </span>

                            <div>

                                <p className="text-slate-100">{label}</p>

                                <p className="text-xs text-slate-500">{sub}</p>

                            </div>

                        </TiltCard>

                    </motion.div>

                ))}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >

                    <TiltCard className={CARD_CLASS}>

                        <span className={ICON_BADGE_CLASS}>

                            <FiHeadphones className="text-lg" />

                        </span>

                        <div>

                            <p className="text-slate-100">
                                {songsAnalyzed.toLocaleString()} songs analyzed
                            </p>

                            <p className="text-xs text-slate-500">Listening summary</p>

                        </div>

                    </TiltCard>

                </motion.div>

            </motion.div>

            <motion.div variants={staggerItem}>

                <Magnetic>

                    <button
                        onClick={() => navigate("/onboarding/adventure")}
                        className="
                            group
                            mt-10
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-8
                            py-3
                            text-sm
                            font-medium
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-cyan-400/40
                            hover:bg-white/10
                            hover:shadow-[0_0_40px_rgba(139,92,246,0.20)]
                        "
                    >
                        Continue

                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

                    </button>

                </Magnetic>

            </motion.div>

        </motion.div>

    );

}