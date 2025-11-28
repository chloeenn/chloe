import React, { useState, useEffect, useRef } from "react";
import "./MusicPlayer.css";

type Song = {
    id: string;
    title: string;
    artist: string;
    color: string; // gradient color for album art placeholder
    audioSrc: string; // path to audio file
};

const SONGS: Song[] = [
    {
        id: "1",
        title: "Nothing",
        artist: "Bruno Majors",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        audioSrc: "/audio/maybe.mp3",
    },
    {
        id: "2",
        title: "Maybe?",
        artist: "RADi",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        audioSrc: "/audio/maybe.mp3",
    },
    {
        id: "3",
        title: "Flutter of a Butterfly",
        artist: "Anothony Lazaro & Jason LaPierre",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        audioSrc: "/audio/flutter-of-a-butterfly.mp3",
    },
];

type MusicPlayerProps = {
    onClose: () => void;
    inline?: boolean; // if true, render as inline card instead of modal
    onPlayStateChange?: (isPlaying: boolean) => void; // notify parent when playing status changes
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ onClose, inline = false, onPlayStateChange }) => {
    const [currentSongId, setCurrentSongId] = useState(SONGS[0].id);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Notify parent of play state changes
    useEffect(() => {
        onPlayStateChange?.(isPlaying);
    }, [isPlaying, onPlayStateChange]);

    // Pause when tab loses focus
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isPlaying) {
                setIsPlaying(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isPlaying]);

    const currentSong = SONGS.find((s) => s.id === currentSongId) || SONGS[0];

    // Use real audio timing and events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (!audio.duration || Number.isNaN(audio.duration)) return;
            const pct = (audio.currentTime / audio.duration) * 100;
            setProgress(pct);
        };

        const handleLoaded = () => {
            // update progress when metadata loaded
            handleTimeUpdate();
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoaded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoaded);
        };
    }, [currentSongId]);

    // Keep audio element play/pause in sync with state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(() => {
                // autoplay might be blocked; ensure UI still reflects state
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, currentSongId]);

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handlePrevious = () => {
        const currentIdx = SONGS.findIndex((s) => s.id === currentSongId);
        const prevIdx = currentIdx === 0 ? SONGS.length - 1 : currentIdx - 1;
        setCurrentSongId(SONGS[prevIdx].id);
        setProgress(0);
        setIsPlaying(true);
    };

    const handleNext = () => {
        const currentIdx = SONGS.findIndex((s) => s.id === currentSongId);
        const nextIdx = (currentIdx + 1) % SONGS.length;
        setCurrentSongId(SONGS[nextIdx].id);
        setProgress(0);
        setIsPlaying(true);
    };

    // When changing songs, update audio src and play if needed
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.src = currentSong.audioSrc;
        audio.load();
        if (isPlaying) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            setProgress(0);
        }
    }, [currentSongId]);

    // Update the iPad music glow color based on the current track's gradient
    useEffect(() => {
        const gradient = currentSong.color || "";
        const m = gradient.match(/#([0-9a-fA-F]{3,6})/);
        let rgb = "59,130,246"; // fallback
        if (m) {
            let h = m[1];
            if (h.length === 3) {
                h = h.split("").map((c) => c + c).join("");
            }
            const r = parseInt(h.substring(0, 2), 16);
            const g = parseInt(h.substring(2, 4), 16);
            const b = parseInt(h.substring(4, 6), 16);
            rgb = `${r},${g},${b}`;
        }

        const shell = document.querySelector(".imac-shell") as HTMLElement | null;
        if (shell) {
            shell.style.setProperty("--music-glow", rgb);
        }
    }, [currentSongId]);

    return (
        <div className={`music-player-overlay ${inline ? "inline" : ""}`} onClick={onClose}>
            <div className="music-player-card" onClick={(e) => e.stopPropagation()}>
                {/* Hidden audio element */}
                <audio
                    ref={audioRef}
                    src={currentSong.audioSrc}
                    autoPlay={isPlaying}
                    onEnded={() => handleNext()}
                />

                {/* Header */}
                <div className="music-player-header">
                    <span className="music-player-label">Now playing</span>
                    <button
                        className="music-player-close"
                        onClick={onClose}
                        aria-label="Close music player"
                    >
                        ✕
                    </button>
                </div>

                {/* Album Art Placeholder (gradient) */}
                {/* <div
          className="music-player-art"
          style={{ background: currentSong.color }}
          aria-hidden="true"
        /> */}

                {/* Song Info */}
                <div className="music-player-info">
                    <h3 className="music-player-title">{currentSong.title}</h3>
                    <p className="music-player-artist">{currentSong.artist}</p>
                </div>

                {/* Progress Bar */}
                <div className="music-player-progress-container">
                    <div
                        className="music-player-progress-bar"
                        role="slider"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(progress)}
                        tabIndex={0}
                        onClick={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const clickX = (e as React.MouseEvent).clientX - rect.left;
                            const pct = (clickX / rect.width) * 100;
                            const audio = audioRef.current;
                            if (audio && audio.duration) {
                                audio.currentTime = (pct / 100) * audio.duration;
                                setProgress(pct);
                            }
                        }}
                    >
                        <div
                            className="music-player-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="music-player-progress-dot"
                            style={{ left: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="music-player-controls">
                    <button
                        className="music-player-btn"
                        onClick={handlePrevious}
                        aria-label="Previous track"
                    >
                        ⏮
                    </button>
                    <button
                        className="music-player-btn music-player-btn-play"
                        onClick={handlePlayPause}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button
                        className="music-player-btn"
                        onClick={handleNext}
                        aria-label="Next track"
                    >
                        ⏭
                    </button>
                </div>

                {/* Playlist */}
                <div className="music-player-playlist">
                    {SONGS.map((song) => (
                        <button
                            key={song.id}
                            className={`music-player-playlist-item ${song.id === currentSongId ? "active" : ""
                                }`}
                            onClick={() => {
                                setCurrentSongId(song.id);
                                setProgress(0);
                                setIsPlaying(true);
                            }}
                        >
                            <div
                                className="music-player-playlist-dot"
                                style={{ background: song.color }}
                            />
                            <div className="music-player-playlist-text">
                                <div className="music-player-playlist-title">{song.title}</div>
                                <div className="music-player-playlist-artist">
                                    {song.artist}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
