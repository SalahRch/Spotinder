type RGB = {
    r: number;
    g: number;
    b: number;
};

type HSL = {
    h: number;
    s: number;
    l: number;
};

function parseRgb(
    color: string,
): RGB | null {
    const match = color.match(
        /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,
    );

    if (!match) {
        return null;
    }

    return {
        r: Number(
            match[1],
        ),
        g: Number(
            match[2],
        ),
        b: Number(
            match[3],
        ),
    };
}

function rgbToHsl({
                      r,
                      g,
                      b,
                  }: RGB): HSL {
    const red =
        r / 255;

    const green =
        g / 255;

    const blue =
        b / 255;

    const max =
        Math.max(
            red,
            green,
            blue,
        );

    const min =
        Math.min(
            red,
            green,
            blue,
        );

    const delta =
        max - min;

    let hue = 0;

    if (delta !== 0) {
        if (max === red) {
            hue =
                60 *
                (((green - blue) /
                        delta) %
                    6);
        } else if (
            max === green
        ) {
            hue =
                60 *
                ((blue - red) /
                    delta +
                    2);
        } else {
            hue =
                60 *
                ((red - green) /
                    delta +
                    4);
        }
    }

    if (hue < 0) {
        hue += 360;
    }

    const lightness =
        (max + min) / 2;

    const saturation =
        delta === 0
            ? 0
            : delta /
            (1 -
                Math.abs(
                    2 *
                    lightness -
                    1,
                ));

    return {
        h: hue,
        s:
            saturation *
            100,
        l:
            lightness *
            100,
    };
}

function hueDistance(
    a: number,
    b: number,
) {
    const difference =
        Math.abs(
            a - b,
        );

    return Math.min(
        difference,
        360 - difference,
    );
}

/*
 * Keep the album hue, but make it more
 * useful as a soft background aura.
 */
function boostAuraColor(
    hsl: HSL,
): string {
    const saturation =
        Math.min(
            82,
            Math.max(
                52,
                hsl.s * 1.12,
            ),
        );

    const lightness =
        Math.min(
            64,
            Math.max(
                42,
                hsl.l +
                12,
            ),
        );

    return `hsl(${Math.round(
        hsl.h,
    )} ${Math.round(
        saturation,
    )}% ${Math.round(
        lightness,
    )}%)`;
}

export function pickJourneyAuraColors(
    colors: string[],
): [string, string] {
    const candidates =
        colors
            .map(
                (
                    color,
                ) => {
                    const rgb =
                        parseRgb(
                            color,
                        );

                    if (!rgb) {
                        return null;
                    }

                    const hsl =
                        rgbToHsl(
                            rgb,
                        );

                    /*
                     * Ignore colors that are:
                     * - extremely dark
                     * - extremely bright
                     * - almost gray
                     */
                    if (
                        hsl.l <
                        18 ||
                        hsl.l >
                        88 ||
                        hsl.s <
                        22
                    ) {
                        return null;
                    }

                    /*
                     * Prefer saturation,
                     * but keep some brightness
                     * in the score.
                     */
                    const score =
                        hsl.s *
                        0.75 +
                        hsl.l *
                        0.25;

                    return {
                        color,
                        hsl,
                        score,
                    };
                },
            )
            .filter(
                (
                    value,
                ): value is NonNullable<
                    typeof value
                > =>
                    value !==
                    null,
            )
            .sort(
                (
                    a,
                    b,
                ) =>
                    b.score -
                    a.score,
            );

    if (
        candidates.length ===
        0
    ) {
        return [
            "hsl(262 70% 58%)",
            "hsl(188 72% 52%)",
        ];
    }

    const primary =
        candidates[0];

    /*
     * Try to find something visually
     * different from the primary hue.
     */
    const secondary =
        candidates.find(
            (
                candidate,
            ) =>
                hueDistance(
                    candidate
                        .hsl.h,
                    primary
                        .hsl.h,
                ) >= 55,
        ) ??
        candidates[1] ??
        primary;

    return [
        boostAuraColor(
            primary.hsl,
        ),
        boostAuraColor(
            secondary.hsl,
        ),
    ];
}