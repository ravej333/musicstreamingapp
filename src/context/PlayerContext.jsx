import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });

    const play = () => {
        audioRef.current.play();
        audioRef.current.volume = 0.1;
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime =
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
            audioRef.current.duration;
    };

    // Update time and seek bar position
    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width =
                    Math.floor(
                        (audioRef.current.currentTime * 100) /
                            audioRef.current.duration
                    ) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }, 1000);
    }, [audioRef]);

    // Liked songs functions
    const toggleLikeSong = (song) => {
        setLikedSongs((prev) =>
            prev.find((s) => s.id === song.id)
                ? prev.filter((s) => s.id !== song.id)
                : [...prev, song]
        );
    };

    const isLiked = (songId) => likedSongs.some((s) => s.id === songId);

    const contextValue = {
        audioRef,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        next,
        previous,
        play,
        pause,
        playWithId,
        seekBar,
        seekBg,
        seekSong,
        time,
        likedSongs,
        toggleLikeSong,
        isLiked,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
