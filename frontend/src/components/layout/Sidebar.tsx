import { NavLink } from "react-router-dom";

import Logo from "../../components/common/Logo";
import { navigation } from "../../config/navigation";


export default function Sidebar() {
    return (
        <aside
            className="
                w-64
                min-h-screen
                border-r
                border-white/10
                bg-white/[0.02]
                backdrop-blur-xl
                p-6
                flex
                flex-col
            "
        >

            <div className="mb-10">
                <Logo small />
            </div>

            <nav className="mt-10 space-y-2">

                {navigation.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({isActive}) =>
                                `
group
flex
items-center
gap-3
rounded-xl
px-4
py-3
text-sm
font-medium
transition-all
duration-300

${
                                    isActive
                                        ? `
bg-white/10
text-white
shadow-[0_0_20px_rgba(168,85,247,0.15)]
`
                                        :
                                        `
text-slate-400
hover:text-white
hover:bg-white/5
`
                                }
`
                            }>
                            <Icon size={18}/>

                            {item.name}

                        </NavLink>
                    );

                })}

            </nav>


            <div className="mt-auto text-xs text-slate-500">
                Spotinder v1.0
            </div>

        </aside>
    );
}