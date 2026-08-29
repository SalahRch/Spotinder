package com.spotinder.backend.discovery.model;

public enum GenreTasteState {

    /**
     * Strong, established part of the user's taste.
     */
    CORE,

    /**
     * Clearly belongs to the user's taste,
     * but isn't necessarily dominant.
     */
    KNOWN,

    /**
     * Spotinder is discovering a promising new
     * area that does not yet have enough evidence
     * to call established taste.
     */
    EMERGING,

    /**
     * We have some information, but not enough
     * evidence or agreement to confidently classify it.
     */
    UNCERTAIN,

    /**
     * Spotinder has meaningful negative evidence
     * from discovery behavior.
     */
    AVOID,

    /**
     * No meaningful user evidence exists yet.
     */
    UNKNOWN
}