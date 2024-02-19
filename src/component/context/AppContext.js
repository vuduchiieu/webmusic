import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";

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

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "https://be-song.vercel.app/v1/auth/refresh",
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
      async (config) => {
        let date = new Date();
        const decodedToken = jwtDecode(user?.accessToken);
        if (decodedToken.exp < date.getTime() / 1000) {
          const data = await refreshToken();
          const refreshUser = {
            ...user,
            accessToken: data.accessToken,
          };
          dispatch(stateSuccess(refreshUser));
          config.headers["token"] = "Bearer " + data.accessToken;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    return newInstance;
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
        createAxios,
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
