import {
    AnimatePresence,
    motion,
} from "framer-motion";
import {
    type FormEvent,
    useState,
} from "react";
import {
    FiCheck,
    FiMail,
    FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { requestAccess } from "../services/access";

type RequestAccessModalProps = {
    open: boolean;
    onClose: () => void;
    variant?: "default" | "oauth-limited";
};

export default function RequestAccessModal({
                                               open,
                                               onClose,
                                               variant = "default",
                                           }: RequestAccessModalProps) {
    const isOAuthLimited = variant === "oauth-limited";
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const normalizedEmail = email.trim();

        if (!normalizedEmail || isSubmitting) {
            return;
        }

        try {
            setIsSubmitting(true);

            await requestAccess({
                email: normalizedEmail,
            });

            setSubmitted(true);
        } catch {
            toast.error(
                "Couldn't send your access request. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        onClose();
        setEmail("");
        setSubmitted(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={handleClose}
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-[#05070c]/80
                        px-6
                        backdrop-blur-xl
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 24,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 12,
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.22,
                            ease: "easeOut",
                        }}
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            relative
                            w-full
                            max-w-[460px]
                            overflow-hidden
                            rounded-[32px]
                            border
                            border-white/10
                            bg-[#111827]/95
                            p-8
                            shadow-[0_30px_100px_rgba(0,0,0,0.65)]
                            backdrop-blur-2xl
                            md:p-10
                        "
                    >
                        {/* Ambient glows */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-24
                                -top-24
                                h-56
                                w-56
                                rounded-full
                                bg-violet-500/15
                                blur-[80px]
                            "
                        />

                        <div
                            className="
                                pointer-events-none
                                -bottom-24
                                -left-24
                                absolute
                                h-52
                                w-52
                                rounded-full
                                bg-cyan-400/10
                                blur-[80px]
                            "
                        />

                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label="Close access request"
                            className="
                                absolute
                                right-5
                                top-5
                                z-10
                                rounded-full
                                p-2
                                text-slate-500
                                transition
                                hover:bg-white/5
                                hover:text-slate-200
                            "
                        >
                            <FiX size={19} />
                        </button>

                        {!submitted ? (
                            <div className="relative z-10">
                                <div
                                    className="
                                        mb-6
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-violet-400/20
                                        bg-violet-400/10
                                        text-violet-300
                                    "
                                >
                                    <FiMail size={21} />
                                </div>

                                <p
                                    className="
        text-xs
        font-semibold
        uppercase
        tracking-[0.22em]
        text-violet-300
    "
                                >
                                    {isOAuthLimited
                                        ? "Private Beta"
                                        : "Early Access"}
                                </p>

                                <h2
                                    className="
        mt-3
        text-3xl
        font-semibold
        tracking-tight
        text-slate-100
    "
                                >
                                    {isOAuthLimited
                                        ? "You found us early."
                                        : "Want to try Spotinder?"}
                                </h2>

                                <p
                                    className="
        mt-4
        text-sm
        leading-6
        text-slate-400
    "
                                >
                                    {isOAuthLimited ? (
                                        <>
                                            Spotinder is still in private beta, and
                                            Spotify currently limits how many listeners
                                            can connect while we're building.
                                            <span className="mt-3 block text-slate-300">
                So we're opening the doors a few
                listeners at a time.
            </span>
                                        </>
                                    ) : (
                                        <>
                                            Spotify currently limits Spotinder to a
                                            small number of approved test accounts.
                                            Request access and I'll add your account
                                            when a spot is available.
                                        </>
                                    )}
                                </p>

                                {isOAuthLimited && (
                                    <div
                                        className="
            mt-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.03]
            px-4
            py-3.5
        "
                                    >
        <span
            className="
                mt-[2px]
                h-2
                w-2
                shrink-0
                rounded-full
                bg-emerald-400
                shadow-[0_0_12px_rgba(52,211,153,0.7)]
            "
        />

                                        <p
                                            className="
                text-xs
                leading-5
                text-slate-500
            "
                                        >
                                            Spotinder is live and working — access is
                                            currently limited by Spotify's development
                                            policy.
                                        </p>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-8"
                                >
                                    <label
                                        htmlFor="access-email"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
                                            text-slate-300
                                        "
                                    >
                                        Spotify account email
                                    </label>

                                    <input
                                        id="access-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="you@example.com"
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            px-4
                                            py-3.5
                                            text-sm
                                            text-white
                                            outline-none
                                            transition
                                            placeholder:text-slate-600
                                            focus:border-violet-400/40
                                            focus:bg-white/[0.07]
                                            focus:shadow-[0_0_30px_rgba(139,92,246,0.08)]
                                        "
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="
                                            mt-4
                                            w-full
                                            rounded-2xl
                                            border
                                            border-violet-400/20
                                            bg-violet-500/90
                                            px-5
                                            py-3.5
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition
                                            hover:-translate-y-0.5
                                            hover:bg-violet-500
                                            hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        {isSubmitting
                                            ? "Requesting..."
                                            : isOAuthLimited
                                                ? "Request an invite"
                                                : "Request early access"}
                                    </button>
                                </form>

                                <p
                                    className="
                                        mt-4
                                        text-center
                                        text-xs
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    Use the email connected to your
                                    Spotify account.
                                </p>
                            </div>
                        ) : (
                            <div
                                className="
                                    relative
                                    z-10
                                    py-6
                                    text-center
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        mb-6
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-cyan-400/20
                                        bg-cyan-400/10
                                        text-cyan-300
                                    "
                                >
                                    <FiCheck size={24} />
                                </div>

                                <p
                                    className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-cyan-300
                                    "
                                >
                                    Request received
                                </p>

                                <h2
                                    className="
                                        mt-3
                                        text-3xl
                                        font-semibold
                                        tracking-tight
                                        text-slate-100
                                    "
                                >
                                    You're on the list.
                                </h2>

                                <p
                                    className="
                                        mx-auto
                                        mt-4
                                        max-w-sm
                                        text-sm
                                        leading-6
                                        text-slate-400
                                    "
                                >
                                    Once your Spotify account is
                                    approved, you'll be able to start
                                    discovering with Spotinder.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="
                                        mt-8
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-7
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:border-violet-400/30
                                        hover:bg-white/10
                                    "
                                >
                                    Got it
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}