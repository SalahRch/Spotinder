export type CreatePlaylistRequest = {
    name: string;
};

export type PlaylistResponse = {
    id: string;
    name: string;
    spotifyPlaylistId: string;
    spotifyUrl: string;
    tracks: string[];
};