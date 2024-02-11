import React, { useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";
import { recommend } from "~/db/songs";

const AppContext = createContext();

const Contexts = ({ children }) => {
  const themeModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const saveTheme = localStorage.getItem("themeMode");

  const initialTheme =
    saveTheme !== null ? JSON.parse(saveTheme) : themeModeMediaQuery.matches;

  const [themeMode, setThemeMode] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(themeMode));
  }, [themeMode]);

  const [play, setPlay] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongs = (item) => {
    setPlay(item);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  const [isRandom, setIsRandom] = useState(false);

  const handleNext = () => {
    const nextSongIndex = isRandom
      ? Math.floor(Math.random() * recommend.length)
      : (recommend.indexOf(play) + 1) % recommend.length;
    const nextSong = recommend[nextSongIndex];
    setPlay(nextSong);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  const handleBackWard = () => {
    const prevSongIndex = isRandom
      ? Math.floor(Math.random() * recommend.length)
      : (recommend.indexOf(play) - 1 + recommend.length) % recommend.length;
    const prevSong = recommend[prevSongIndex];
    setPlay(prevSong);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  const [avatar, setAvatart] = useState(localStorage.getItem("photoURL") || "");

  return (
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        handleSongs,
        play,
        isPlaying,
        setIsPlaying,
        avatar,
        setAvatart,
        handleNext,
        isRandom,
        setIsRandom,
        handleBackWard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { Contexts, useAppContext };
