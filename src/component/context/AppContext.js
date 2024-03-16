import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const AppContext = createContext();

const Contexts = ({ children }) => {
  // Lấy thông tin người dùng từ Redux
  const user = useSelector((state) => state.auth.login.currentUser);

  // Ref cho audio
  const audioRef = useRef(null);

  // State cho việc tìm kiếm
  const [search, setSearch] = useState(false);
  //State cho danh sách like
  const [listLike, setListLike] = useState([]);

  // State cho danh sách nhạc nghe lại
  const [again, setAgain] = useState([]);

  // State cho danh sách nhạc nổi bật
  const [treding, setTreding] = useState([]);

  // State cho danh sách nhạc đề xuất
  const [recommend, setRecommend] = useState([]);

  // State cho tất cả các bài hát
  const [allSongs, setAllSongs] = useState([]);

  //State cho bài hát upload
  const listUpload = allSongs
    .filter((song) => song.user === user?._id)
    .sort((a, b) =>
      b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    )
    .map((song) => ({ ...song, source: "upload" }));

  // State cho việc làm mới dữ liệu
  const [refreshData, setRefreshData] = useState(true);

  // State cho thời lượng của bài hát
  const [duration, setDuration] = useState(0);

  // State cho thời gian hiện tại của bài hát
  const [currentTime, setCurrentTime] = useState(0);

  // State cho bài hát đang phát
  const [play, setPlay] = useState([]);

  // Kiểm soát trạng thái phát/nghỉ của bài hát
  const [isPlaying, setIsPlaying] = useState(false);

  // Lấy ID người dùng và ID bài hát đang phát
  const idUser = user?._id;
  const idSong = play?._id;

  // Kiểm tra chế độ theme
  const themeModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const saveTheme = localStorage.getItem("themeMode");
  const initialTheme =
    saveTheme !== null ? JSON.parse(saveTheme) : themeModeMediaQuery.matches;
  const [themeMode, setThemeMode] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(themeMode));
  }, [themeMode]);

  // Xử lý sự kiện khi chọn bài hát để phát
  const handleSongs = (item) => {
    setPlay(item);
    if (item === play) {
      setIsPlaying(!isPlaying);
    }
    if (item !== play) {
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  };

  // Lấy thời gian bài hát
  const listenTime = Math.floor(
    (audioRef.current?.currentTime / duration) * 100
  );

  // Xử lý sự kiện trước khi đóng trang web
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

  // State cho trạng thái đăng nhập
  const [login, setLogin] = useState(false);

  // State cho trạng thái thích bài hát
  const [like, setLike] = useState(false);

  const [libraryUpload, setLibraryUpload] = useState(false);

  //Render danh sách likes
  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        try {
          const resLike = await axios.get(
            `https://be-stave-6c9234b70089.herokuapp.com/v1/songs/like/${user?._id}`
          );
          setListLike(
            resLike.data
              .map((song) => ({
                ...song,
                source: "likes",
              }))
              .filter((song) => song["status"] === "approved")
          );
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
          setRefreshData(false);
        }
      };
      if (refreshData) {
        fetchData();
      }
    }
  }, [refreshData, user]);

  // Render danh sách nghe lại
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const resAgain = await axios.get(
            `https://be-stave-6c9234b70089.herokuapp.com/v1/songs/listened/${user?._id}`
          );
          setAgain(
            resAgain.data
              .map((song) => ({
                ...song,
                source: "again",
              }))
              .filter((song) => song["status"] === "approved")
          );
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
          setRefreshData(false);
        }
      };
      if (refreshData) {
        fetchData();
      }
    }
  }, [refreshData, user]);

  // Render danh sách nhạc nổi bật
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTrending = await axios.get(
          "https://be-stave-6c9234b70089.herokuapp.com/v1/songs/trending"
        );
        setTreding(
          resTrending.data
            .map((song) => ({
              ...song,
              source: "trending",
            }))
            .filter((song) => song["status"] === "approved")
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setRefreshData(false);
      }
    };
    if (refreshData) {
      fetchData();
    }
  }, [refreshData]);

  // Render danh sách nhạc đề xuất
  useEffect(() => {
    const fetchData = async () => {
      if (user != null) {
        try {
          const resRecommend = await axios.get(
            `https://be-stave-6c9234b70089.herokuapp.com/v1/songs/recommend/${user?._id}`
          );
          setRecommend(
            resRecommend.data
              .map((song) => ({
                ...song,
                source: "recommend",
              }))
              .filter((song) => song["status"] === "approved")
          );
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
          setRefreshData(false);
        }
      }
    };
    if (refreshData) {
      fetchData();
    }
  }, [refreshData, user]);

  // Render tất cả các bài hát
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAllSong = await axios.get(
          "https://be-stave-6c9234b70089.herokuapp.com/v1/songs/"
        );
        setAllSongs(
          resAllSong.data.allSong
            .sort((a, b) => a.title?.localeCompare(b.title))
            .map((song) => ({ ...song, source: "allSong" }))
            .filter((song) => song["status"] === "approved")
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setRefreshData(false);
      }
    };
    if (refreshData) {
      fetchData();
    }
  }, [refreshData]);

  // Thêm bài hát vào danh sách nghe lại
  const handleUpdateAgain = useCallback(async () => {
    if (idUser && idSong && listenTime === 50) {
      try {
        await axios
          .put(
            `https://be-stave-6c9234b70089.herokuapp.com/v1/songs/listened/${idUser}/${idSong}`
          )
          .then(() => {
            setRefreshData(true);
          });
      } catch (error) {
        console.error("Lỗi khi thêm bài hát vào danh sách nghe lại:", error);
      }
    }
  }, [listenTime, idSong, idUser, setRefreshData]);
  useEffect(() => {
    if (play.source !== "again") {
      handleUpdateAgain();
    }
  }, [play, handleUpdateAgain]);
  // Thêm bài hát vào danh sách nhạc nổi bật
  const handleUpdateTrending = useCallback(async () => {
    if (idSong && listenTime === 50) {
      try {
        await axios.put(
          `https://be-stave-6c9234b70089.herokuapp.com/v1/songs/trending/${idSong}`
        );
        setRefreshData(true);
      } catch (error) {
        console.error(
          "Lỗi khi thêm bài hát vào danh sách nhạc nổi bật:",
          error
        );
      }
    }
  }, [listenTime, idSong, setRefreshData]);
  useEffect(() => {
    handleUpdateTrending();
  }, [listenTime, idSong, handleUpdateTrending]);

  const handleBack = () => {
    setSearch(false);
    setLibraryUpload(false);
    setLike(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [detail, setDetail] = useState(false);
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
        setLibraryUpload,
        libraryUpload,
        listLike,
        again,
        setAgain,
        treding,
        setTreding,
        recommend,
        setRecommend,
        allSongs,
        setAllSongs,
        refreshData,
        setRefreshData,
        user,
        login,
        setLogin,
        audioRef,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        handleBack,
        listUpload,
        openModal,
        closeModal,
        isModalOpen,
        isMobile,
        detail,
        setDetail,
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
