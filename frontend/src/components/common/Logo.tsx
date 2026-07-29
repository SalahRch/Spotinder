type LogoProps = {
    small?: boolean;
};

export default function Logo({
                                 small = false,
                             }: LogoProps) {

    return (

        <div className="select-none">

            <h1
                className={`
                    bg-gradient-to-r
                    from-blue-400
                    via-violet-400
                    to-fuchsia-500
                    bg-clip-text
                    font-black
                    tracking-[-0.05em]
                    text-transparent
                    transition-all
                    duration-300
                    ${
                    small
                        ? "text-3xl md:text-4xl"
                        : "text-7xl md:text-8xl"
                }
                `}
            >

                Spotinder

            </h1>

        </div>

    );

}