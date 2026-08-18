import {
    useEffect,
    useState,
} from "react";

import type {
    AchievementUnlock,
} from "../types/achievement";

export function useAchievementQueue() {
    const [
        queue,
        setQueue,
    ] = useState<AchievementUnlock[]>(
        [],
    );

    const currentAchievement =
        queue[0];

    const addAchievements = (
        achievements:
        AchievementUnlock[],
    ) => {
        if (
            achievements.length === 0
        ) {
            return;
        }

        setQueue((current) => [
            ...current,
            ...achievements,
        ]);
    };

    const dismissCurrent =
        () => {
            setQueue(
                (current) =>
                    current.slice(1),
            );
        };

    useEffect(() => {
        if (!currentAchievement) {
            return;
        }

        const timeout =
            window.setTimeout(
                () => {
                    dismissCurrent();
                },
                4000,
            );

        return () => {
            window.clearTimeout(
                timeout,
            );
        };
    }, [currentAchievement]);

    return {
        currentAchievement,
        addAchievements,
        dismissCurrent,
    };
}