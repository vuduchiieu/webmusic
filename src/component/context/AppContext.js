import React, { useEffect, useState, createContext, useContext } from "react";
import { useSelector } from "react-redux";

const AppContext = createContext();

const Contexts = ({ children }) => {
  const [search, setSearch] = useState(false);
  const [again, setAgain] = useState([]);
  const [treding, setTreding] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [refreshData, setRefreshData] = useState(true);
  const [apiCalled, setApiCalled] = useState(false);

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
    if (item === play) {
      setIsPlaying(!isPlaying);
    }
    if (item !== play) {
      setIsPlaying(false);
      setApiCalled(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
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

  const [like, setLike] = useState(false);
  const handleLikeToggle = (title) => {
    if (!user) {
      alert("bạn cần đăng nhập để thêm bài hát vào yêu thích");
      setLogin(true);
      return;
    }
    setLike((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const [login, setLogin] = useState(false);

  const user = useSelector((state) => state.auth.login.currentUser);

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
        search,
        setSearch,
        like,
        setLike,
        handleLikeToggle,
        again,
        setAgain,
        treding,
        setTreding,
        recommend,
        setRecommend,
        refreshData,
        setRefreshData,
        apiCalled,
        setApiCalled,
        user,
        login,
        setLogin,
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
