import { motion } from "framer-motion";

type AuroraTextProps = {
    children: React.ReactNode;
};

export default function AuroraText({
                                       children,
                                   }: AuroraTextProps) {

    return (

        <motion.span

            animate={{
                backgroundPosition: [
                    "0% 50%",
                    "100% 50%",
                    "0% 50%",
                ],
            }}

            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            className="
                inline-block
                bg-[linear-gradient(90deg,#67E8F9,#FFFFFF,#C084FC,#67E8F9)]
                bg-[length:250%_100%]
                bg-clip-text
                text-transparent
            "

        >

            {children}

        </motion.span>

    );

}