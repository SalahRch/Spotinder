import { motion } from "framer-motion";

export default function TimelineLine() {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="
                absolute
                left-0
                right-0
                top-10
                hidden
                h-px
                origin-left
                bg-gradient-to-r
                from-cyan-400/0
                via-cyan-400/40
                to-violet-400/0
                md:block
            "
        />
    );
}