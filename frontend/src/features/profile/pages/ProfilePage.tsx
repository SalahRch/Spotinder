import { useProfile } from "../hooks/useProfile";
import ProfileHero from "@/features/profile/components/ProfileHero.tsx";
import DiscoveryPreferences from "@/features/profile/components/DiscoveryPreferences.tsx";
import { useInsights } from "@/features/insights/hooks/useInsights";
import ProfileJourney from "@/features/profile/components/ProfileJourney.tsx";
import AchievementCollection from "@/features/achievements/components/AchievementCollection.tsx";

export default function ProfilePage() {
    const {
        data: profile,
        isLoading,
        isError,
    } = useProfile();

    const {
        data: insights,
        isLoading: insightsLoading,
    } = useInsights();

    if (isLoading) {
        return (
            <div className="p-10 text-slate-400">
                Loading profile...
            </div>
        );
    }

    if (
        isError ||
        !profile
    ) {
        return (
            <div className="p-10 text-rose-300">
                Couldn&apos;t load profile.
            </div>
        );
    }
    return (
        <section
            className="
            relative
            min-h-screen
            overflow-hidden
            bg-[#0B0F17]
            text-white
        "
        >
            <div
                className="
                relative
                z-10
                mx-auto
                w-full
                max-w-[1280px]
                px-6
                py-10
                lg:px-10
                lg:py-12
            "
            >
                <ProfileHero
                    profile={profile}
                />
                <DiscoveryPreferences
                    key={`${profile.adventureLevel}-${profile.blindModeDefault}`}
                    profile={profile}
                />

                <AchievementCollection />

                {!insightsLoading && insights && (
                <ProfileJourney
                    insights={insights}
                />
            )}
            </div>
        </section>
    );
}