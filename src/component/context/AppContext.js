import React, { useEffect, useState, createContext, useContext } from "react";

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        const message =
          "Bạn đang nghe một bài hát. Bạn có chắc muốn rời khỏi trang?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  const [avatar, setAvatart] = useState(localStorage.getItem("photoURL") || "");

  const [like, setLike] = useState(false);
  const handleLikeToggle = (title) => {
    setLike((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

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
        like,
        setLike,
        handleLikeToggle,
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
