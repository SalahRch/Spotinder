interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
        Player: new (options: {
            name: string;
            getOAuthToken: (
                callback: (token: string) => void,
            ) => void;
            volume?: number;
        }) => SpotifyPlayer;
    };
}
interface SpotifyPlaybackState {
    paused: boolean;
    position: number;
    duration: number;

    track_window: {
        current_track: {
            id: string;
            name: string;
        };
    };
}

interface SpotifyPlayer {
    connect(): Promise<boolean>;
    disconnect(): void;

    pause(): Promise<void>;
    resume(): Promise<void>;
    seek(positionMs: number): Promise<void>;

    getCurrentState():
        Promise<SpotifyPlaybackState | null>;

    addListener(
        event: "ready",
        callback: (state: {
            device_id: string;
        }) => void,
    ): boolean;

    addListener(
        event: "not_ready",
        callback: (state: {
            device_id: string;
        }) => void,
    ): boolean;

    addListener(
        event: "player_state_changed",
        callback: (
            state: SpotifyPlaybackState | null,
        ) => void,
    ): boolean;

    addListener(
        event:
            | "initialization_error"
            | "authentication_error"
            | "account_error"
            | "playback_error",
        callback: (state: {
            message: string;
        }) => void,
    ): boolean;
}