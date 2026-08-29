export default function StatusBar() {
    return (
        <div className="flex items-center justify-between px-6 pt-5">

            <span className="text-xs font-semibold text-slate-300">
                9:41
            </span>

            <div className="h-7 w-24 rounded-full bg-black" />

            <div className="flex items-center gap-1">

                <div className="h-2 w-2 rounded-full bg-slate-400" />

                <div className="h-2 w-2 rounded-full bg-slate-400" />

                <div className="h-2 w-2 rounded-full bg-slate-400" />

            </div>

        </div>
    );
}