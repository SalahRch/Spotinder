import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import StepDots from "../../components/common/StepDots";
import AuroraText from "../../components/animations/AuroraText";
import Magnetic from "../../components/common/Magnetic";
import VinylRecord from "../../components/common/VinylRecord";
import { staggerContainer, staggerItem } from "../../assets/motionVariants";

export default function AnalyzingPage() {

    const navigate = useNavigate();

    return (

        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
        >

            <motion.div variants={staggerItem}>
                <StepDots total={3} current={0} />
            </motion.div>

            <motion.div variants={staggerItem} className="mb-10 flex justify-center">

                <VinylRecord size={112} />

            </motion.div>

            <motion.h2
                variants={staggerItem}
                className="text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl"
            >
                <AuroraText>Analyzing</AuroraText> your Spotify library
            </motion.h2>

            <motion.p variants={staggerItem} className="mt-4 text-slate-400">
                Looking at your top artists, tracks, and recently played songs
                <br />
                to understand your taste.
            </motion.p>

            <motion.div
                variants={staggerItem}
                className="fixed inset-x-0 bottom-8 z-30 flex justify-center px-6"
            >

                <Magnetic>

                    <button
                        onClick={() => navigate("/onboarding/profile")}
                        className="
                            group
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