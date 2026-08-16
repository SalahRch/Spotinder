export async function extractAlbumColor(
    imageUrl: string,
): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.crossOrigin = "anonymous";

        image.onload = () => {
            try {
                const canvas =
                    document.createElement("canvas");

                const size = 48;

                canvas.width = size;
                canvas.height = size;

                const context =
                    canvas.getContext("2d");

                if (!context) {
                    reject(
                        new Error(
                            "Could not create canvas context.",
                        ),
                    );
                    return;
                }

                context.drawImage(
                    image,
                    0,
                    0,
                    size,
                    size,
                );

                const { data } =
                    context.getImageData(
                        0,
                        0,
                        size,
                        size,
                    );

                const buckets =
                    new Map<
                        string,
                        {
                            count: number;
                            r: number;
                            g: number;
                            b: number;
                        }
                    >();

                for (
                    let index = 0;
                    index < data.length;
                    index += 4
                ) {
                    const r =
                        data[index];

                    const g =
                        data[index + 1];

                    const b =
                        data[index + 2];

                    const alpha =
                        data[index + 3];

                    if (alpha < 128) {
                        continue;
                    }

                    const max =
                        Math.max(
                            r,
                            g,
                            b,
                        );

                    const min =
                        Math.min(
                            r,
                            g,
                            b,
                        );

                    const brightness =
                        (r + g + b) / 3;

                    const saturation =
                        max - min;

                    /*
                     * Ignore:
                     * - very dark pixels
                     * - almost white pixels
                     * - near-gray pixels
                     */
                    if (
                        brightness < 35 ||
                        brightness > 235 ||
                        saturation < 28
                    ) {
                        continue;
                    }

                    /*
                     * Quantize into buckets so
                     * similar colors count together.
                     */
                    const bucketR =
                        Math.round(r / 32) *
                        32;

                    const bucketG =
                        Math.round(g / 32) *
                        32;

                    const bucketB =
                        Math.round(b / 32) *
                        32;

                    const key =
                        `${bucketR}-${bucketG}-${bucketB}`;

                    const existing =
                        buckets.get(key);

                    if (existing) {
                        existing.count++;
                        existing.r += r;
                        existing.g += g;
                        existing.b += b;
                    } else {
                        buckets.set(
                            key,
                            {
                                count: 1,
                                r,
                                g,
                                b,
                            },
                        );
                    }
                }

                if (buckets.size === 0) {
                    resolve("#A78BFA");
                    return;
                }

                const winner =
                    [...buckets.values()]
                        .sort(
                            (a, b) =>
                                b.count -
                                a.count,
                        )[0];

                const r =
                    Math.round(
                        winner.r /
                        winner.count,
                    );

                const g =
                    Math.round(
                        winner.g /
                        winner.count,
                    );

                const b =
                    Math.round(
                        winner.b /
                        winner.count,
                    );

                resolve(
                    `rgb(${r}, ${g}, ${b})`,
                );
            } catch (error) {
                reject(error);
            }
        };

        image.onerror = () => {
            reject(
                new Error(
                    "Could not load album artwork.",
                ),
            );
        };

        image.src = imageUrl;
    });
}