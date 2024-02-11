import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

const Contexts = ({ children }) => {
  const [search, setSearch] = useState(false);

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

  const [avatar, setAvatart] = useState(localStorage.getItem("photoURL") || "");

  return (
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        handleSongs,
        play,
        setPlay,
        isPlaying,
        setIsPlaying,
        avatar,
        setAvatart,
        search,
        setSearch,
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
