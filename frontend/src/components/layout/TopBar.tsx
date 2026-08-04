export default function TopBar() {
    return (
        <header
            className="
                h-16
                border-b
                border-white/10
                flex
                items-center
                justify-between
                px-8
                bg-white/[0.02]
                backdrop-blur-xl
            "
        >

            <h1 className="text-lg font-medium">
                Discover
            </h1>


            <div
                className="
                    h-9
                    w-9
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    text-sm
                "
            >
                S
            </div>

        </header>
    );
}