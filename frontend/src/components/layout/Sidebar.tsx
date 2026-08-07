import { NavLink } from "react-router-dom";

import { navigation } from "@/config/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Sidebar() {

    const { user } = useAuth();

    return (

        <aside
            className="
                sticky
                top-0
                z-40
                flex
                h-screen
                w-20
                shrink-0
                flex-col
                items-center
                border-r
                border-white/[0.07]
                bg-[#0E131C]/90
                py-6
                backdrop-blur-2xl
            "
        >

            {/* Logo */}

            <div
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                "
            >

                <span
                    className="
                        bg-gradient-to-r
                        from-cyan-300
                        via-violet-400
                        to-fuchsia-400
                        bg-clip-text
                        text-2xl
                        font-bold
                        text-transparent
                    "
                >
                    S
                </span>

            </div>

            {/* Navigation */}

            <nav
                className="
                    mt-12
                    flex
                    flex-1
                    flex-col
                    items-center
                    gap-2
                "
            >

                {

                    navigation.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.path}
                                className="group/item relative"
                            >

                                <NavLink

                                    to={item.path}

                                    aria-label={item.name}

                                    className={({ isActive }) => `

                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-[14px]
                                        border
                                        transition-all
                                        duration-200

                                        ${

                                        isActive

                                            ? `
                                                border-white/10
                                                bg-white/10
                                                text-white
                                                shadow-[0_0_30px_rgba(139,92,246,0.10)]
                                            `

                                            : `
                                                border-transparent
                                                text-slate-400
                                                hover:border-white/[0.08]
                                                hover:bg-white/[0.06]
                                                hover:text-white
                                            `

                                    }

                                    `}

                                >

                                    <Icon className="h-5 w-5" />

                                </NavLink>

                                {/* Floating Label */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-[calc(100%+12px)]
                                        top-1/2
                                        z-50
                                        -translate-y-1/2
                                        whitespace-nowrap
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#151B26]/95
                                        px-3
                                        py-2
                                        text-sm
                                        font-medium
                                        text-slate-200
                                        opacity-0
                                        shadow-[0_12px_35px_rgba(0,0,0,0.35)]
                                        backdrop-blur-xl
                                        transition-all
                                        duration-200
                                        group-hover/item:translate-x-0
                                        group-hover/item:opacity-100
                                    "
                                >

                                    {item.name}

                                </div>

                            </div>

                        );

                    })

                }

            </nav>

            {/* User */}

            <div
                className="
                    group/profile
                    relative
                    mt-auto
                "
            >

                <button
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        transition-all
                        duration-200
                        hover:border-violet-400/30
                        hover:bg-white/10
                    "
                >

                    {

                        user?.avatarUrl

                            ? (

                                <img

                                    src={user.avatarUrl}

                                    alt={user.displayName}

                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "

                                />

                            )

                            : (

                                <span
                                    className="
                                        text-sm
                                        font-semibold
                                    "
                                >
                                    {user?.displayName?.charAt(0) ?? "S"}
                                </span>

                            )

                    }

                </button>

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-1/2
                        left-[calc(100%+12px)]
                        z-50
                        translate-y-1/2
                        whitespace-nowrap
                        rounded-xl
                        border
                        border-white/10
                        bg-[#151B26]/95
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-slate-200
                        opacity-0
                        shadow-[0_12px_35px_rgba(0,0,0,0.35)]
                        backdrop-blur-xl
                        transition-all
                        duration-200
                        group-hover/profile:opacity-100
                    "
                >

                    {user?.displayName}

                </div>

            </div>

        </aside>

    );

}