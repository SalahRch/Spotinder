package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.GenreNeighborhood;
import com.spotinder.backend.spotify.dto.SpotifyArtistResponse;
import com.spotinder.backend.spotify.service.SpotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class GenreNeighborhoodService {

    private static final int SEARCH_PAGE_SIZE = 10;
    private static final int MAX_SEARCH_PAGES = 2;

    // Keep the experiment shallow for now.
    private static final int MAX_DISTANCE = 2;

    private final SpotifyService spotifyService;

    private final Map<String, List<SpotifyArtistResponse>> artistSearchCache =
            new ConcurrentHashMap<>();


    public List<GenreNeighborhood> discover(
            Collection<String> seedGenres
    ) {

        if (seedGenres == null || seedGenres.isEmpty()) {
            return List.of();
        }

        /*
         * genre -> best path discovered from any seed.
         */
        Map<String, GenreNeighborhood> discovered =
                new LinkedHashMap<>();

        Queue<GenreNode> queue =
                new ArrayDeque<>();


        /*
         * =====================================================
         * SEEDS
         * =====================================================
         */

        for (String rawSeed : seedGenres) {

            String seed =
                    normalizeGenre(rawSeed);

            if (seed.isBlank()) {
                continue;
            }

            if (discovered.containsKey(seed)) {
                continue;
            }

            GenreNeighborhood neighborhood =
                    new GenreNeighborhood(
                            seed,
                            0,
                            null,

                            0,
                            0,
                            1.0,
                            1.0,

                            1.0,
                            List.of(seed)
                    );

            discovered.put(
                    seed,
                    neighborhood
            );

            queue.add(
                    new GenreNode(
                            seed,
                            0
                    )
            );
        }


        /*
         * =====================================================
         * BREADTH-FIRST DISCOVERY
         * =====================================================
         */

        while (!queue.isEmpty()) {

            GenreNode current =
                    queue.poll();

            if (current.distance() >= MAX_DISTANCE) {
                continue;
            }

            GenreNeighborhood parentNeighborhood =
                    discovered.get(current.genre());

            if (parentNeighborhood == null) {
                continue;
            }

            List<SpotifyArtistResponse> searchResults =
                    searchArtistsForGenre(
                            current.genre()
                    );


            /*
             * Spotify Search is fuzzy.
             *
             * Keep only artists whose actual Spotify metadata
             * contains the genre we searched for.
             */
            List<SpotifyArtistResponse> validArtists =
                    searchResults.stream()
                            .filter(
                                    artist ->
                                            representsGenre(
                                                    artist,
                                                    current.genre()
                                            )
                            )
                            .toList();


            if (validArtists.isEmpty()) {
                continue;
            }


            /*
             * =================================================
             * BUILD EDGE EVIDENCE FOR THIS PARENT GENRE
             * =================================================
             *
             * Example:
             *
             * cloud rap:
             *
             * 16 valid artists inspected
             *
             * emo rap                -> 8 artists
             * underground hip hop    -> 5 artists
             * witch house            -> 1 artist
             *
             * These are EDGE counts, not global genre counts.
             */

            Map<String, Integer> edgeEvidence =
                    new HashMap<>();


            for (SpotifyArtistResponse artist : validArtists) {

                if (artist.genres() == null) {
                    continue;
                }

                /*
                 * Use a set so one artist can only contribute
                 * once to a particular edge.
                 */
                Set<String> artistGenres =
                        new HashSet<>();

                for (String rawGenre : artist.genres()) {

                    String genre =
                            normalizeGenre(rawGenre);

                    if (
                            genre.isBlank() ||
                                    genre.equals(current.genre())
                    ) {
                        continue;
                    }

                    artistGenres.add(genre);
                }


                for (String genre : artistGenres) {

                    edgeEvidence.merge(
                            genre,
                            1,
                            Integer::sum
                    );
                }
            }


            /*
             * =================================================
             * CREATE / UPDATE NEIGHBORHOODS
             * =================================================
             */

            int childDistance =
                    current.distance() + 1;


            for (
                    Map.Entry<String, Integer> edge
                    : edgeEvidence.entrySet()
            ) {

                String childGenre =
                        edge.getKey();

                int evidence =
                        edge.getValue();


                /*
                 * Meaning:
                 *
                 * Of all valid artists representing the parent
                 * genre, what fraction ALSO contain childGenre?
                 */
                int sampleSize =
                        validArtists.size();

                double strength =
                        evidence /
                                (double) sampleSize;

                double edgeConfidence =
                        calculateEdgeConfidence(sampleSize);


                double pathStrength =
                        parentNeighborhood.pathStrength()
                                * strength;

                List<String> path =
                        new ArrayList<>(
                                parentNeighborhood.path()
                        );

                path.add(childGenre);

                GenreNeighborhood candidate =
                        new GenreNeighborhood(
                                childGenre,
                                childDistance,
                                current.genre(),

                                evidence,
                                sampleSize,
                                strength,
                                edgeConfidence,

                                pathStrength,
                                List.copyOf(path)
                        );

                GenreNeighborhood existing =
                        discovered.get(
                                childGenre
                        );


                boolean shouldReplace =
                        existing == null ||

                                /*
                                 * Always prefer the shortest known path.
                                 */
                                candidate.distance()
                                        < existing.distance() ||

                                /*
                                 * If two paths reach the genre at the
                                 * same distance, keep the stronger edge.
                                 */
                                (
                                        candidate.distance()
                                                == existing.distance()
                                                &&
                                                candidate.pathStrength()
                                                        > existing.pathStrength()
                                );


                if (!shouldReplace) {
                    continue;
                }


                /*
                 * Never replace one of the user's seed genres.
                 */
                if (
                        existing != null &&
                                existing.distance() == 0
                ) {
                    continue;
                }


                discovered.put(
                        childGenre,
                        candidate
                );


                /*
                 * Only enqueue genres that can still expand
                 * another level.
                 *
                 * distance 2 is returned but doesn't expand
                 * because MAX_DISTANCE = 2.
                 */
                if (childDistance < MAX_DISTANCE) {

                    queue.add(
                            new GenreNode(
                                    childGenre,
                                    childDistance
                            )
                    );
                }
            }
        }


        /*
         * =====================================================
         * OUTPUT
         * =====================================================
         */

        return discovered.values()
                .stream()
                .sorted(
                        Comparator
                                .comparingInt(
                                        GenreNeighborhood::distance
                                )
                                .thenComparing(
                                        GenreNeighborhood::pathStrength,
                                        Comparator.reverseOrder()
                                )
                                .thenComparing(
                                        GenreNeighborhood::genre
                                )
                )
                .toList();
    }


    /*
     * =========================================================
     * SPOTIFY SEARCH
     * =========================================================
     */

    private List<SpotifyArtistResponse> searchArtistsForGenre(
            String genre
    ) {

        String normalizedGenre =
                normalizeGenre(genre);

        if (normalizedGenre.isBlank()) {
            return List.of();
        }

        return artistSearchCache.computeIfAbsent(
                normalizedGenre,
                this::fetchArtistsForGenre
        );
    }

    private List<SpotifyArtistResponse> fetchArtistsForGenre(
            String genre
    ) {

        Map<String, SpotifyArtistResponse> artists =
                new LinkedHashMap<>();


        for (
                int page = 0;
                page < MAX_SEARCH_PAGES;
                page++
        ) {

            int offset =
                    page * SEARCH_PAGE_SIZE;

            List<SpotifyArtistResponse> results =
                    spotifyService.searchArtists(
                            genre,
                            SEARCH_PAGE_SIZE,
                            offset
                    );


            if (results == null || results.isEmpty()) {
                break;
            }


            for (SpotifyArtistResponse artist : results) {

                if (artist == null || artist.id() == null) {
                    continue;
                }

                artists.putIfAbsent(
                        artist.id(),
                        artist
                );
            }


            if (results.size() < SEARCH_PAGE_SIZE) {
                break;
            }
        }


        return List.copyOf(
                artists.values()
        );
    }


    /*
     * =========================================================
     * GENRE VALIDATION
     * =========================================================
     */

    private boolean representsGenre(
            SpotifyArtistResponse artist,
            String genre
    ) {

        if (
                artist == null ||
                        artist.genres() == null
        ) {
            return false;
        }


        return artist.genres()
                .stream()
                .map(this::normalizeGenre)
                .anyMatch(
                        genre::equals
                );
    }


    /*
     * =========================================================
     * NORMALIZATION
     * =========================================================
     */

    private String normalizeGenre(
            String genre
    ) {

        if (genre == null) {
            return "";
        }


        return genre
                .trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("\\s+", " ");
    }

    private double calculateEdgeConfidence(int sampleSize) {
        return 1.0 - Math.exp(-sampleSize / 3.0);
    }


    private record GenreNode(
            String genre,
            int distance
    ) {
    }
}