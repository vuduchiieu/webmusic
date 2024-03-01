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

// Tạo context cho ứng dụng
const AppContext = createContext();

// Component chứa tất cả các context và state của ứng dụng
const Contexts = ({ children }) => {
  // Lấy thông tin người dùng từ Redux
  const user = useSelector((state) => state.auth.login.currentUser);

  // Ref cho audio
  const audioRef = useRef(null);

  // State cho việc tìm kiếm
  const [search, setSearch] = useState(false);

  // State cho danh sách nhạc nghe lại
  const [again, setAgain] = useState([]);

  // State cho danh sách nhạc nổi bật
  const [treding, setTreding] = useState([]);

  // State cho danh sách nhạc đề xuất
  const [recommend, setRecommend] = useState([]);

  // State cho tất cả các bài hát
  const [allSongs, setAllSongs] = useState([]);

  // State cho việc làm mới dữ liệu
  const [refreshData, setRefreshData] = useState(true);

  // State để kiểm soát việc gọi API
  const [apiCalled, setApiCalled] = useState(false);

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
      setApiCalled(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  };

  // Lấy mảng hiện tại
  const currentArray = [allSongs, treding, recommend, again].find(
    (array) => array && array.some((song) => song.source === play.source)
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

  // State cho trạng thái thích bài hát
  const [like, setLike] = useState(false);

  // Xử lý sự kiện khi nhấn nút thích
  const handleLikeToggle = (title) => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm bài hát vào yêu thích");
      setLogin(true);
      return;
    }
    setLike((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // State cho trạng thái đăng nhập
  const [login, setLogin] = useState(false);

  // Render danh sách nghe lại
  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        try {
          const resAgain = await axios.get(
            `https://be-song.vercel.app/v1/songs/listened/${user?._id}`
          );
          setAgain(
            resAgain.data.listenAgain.map((song) => ({
              ...song,
              source: "again",
            }))
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
          "https://be-song.vercel.app/v1/songs/trending"
        );
        setTreding(
          resTrending.data.map((song) => ({
            ...song,
            source: "trending",
          }))
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
            `https://be-song.vercel.app/v1/songs/recommend/${user?._id}`
          );
          setRecommend(
            resRecommend.data.map((song) => ({
              ...song,
              source: "recommend",
            }))
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
          "https://be-song.vercel.app/v1/songs/"
        );
        setAllSongs(
          resAllSong.data.allSong
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((song) => ({ ...song, source: "allSong" }))
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
    const listenTime = (audioRef.current.currentTime / duration) * 100;
    if (idUser && idSong && listenTime > 50 && !apiCalled) {
      setApiCalled(true);
      try {
        await axios
          .put(
            `https://be-song.vercel.app/v1/songs/listened/${idUser}/${idSong}`
          )
          .then(() => {
            setRefreshData(true);
          });
      } catch (error) {
        setApiCalled(false);
        console.error("Lỗi khi thêm bài hát vào danh sách nghe lại:", error);
      }
    }
  }, [duration, idSong, idUser, apiCalled, setRefreshData, setApiCalled]);

  useEffect(() => {
    handleUpdateAgain();
  }, [currentTime, duration, idSong, idUser, apiCalled, handleUpdateAgain]);

  // Thêm bài hát vào danh sách nhạc nổi bật
  const handleUpdateTrending = useCallback(async () => {
    const listenTime = (audioRef.current.currentTime / duration) * 100;
    if (idSong && listenTime > 50 && !apiCalled) {
      setApiCalled(true);
      try {
        await axios.put(
          `https://be-song.vercel.app/v1/songs/trending/${idSong}`
        );
        setRefreshData(true);
      } catch (error) {
        setApiCalled(false);
        console.error(
          "Lỗi khi thêm bài hát vào danh sách nhạc nổi bật:",
          error
        );
      }
    }
  }, [duration, idSong, apiCalled, setRefreshData, setApiCalled]);
  useEffect(() => {
    handleUpdateTrending();
  }, [currentTime, duration, idSong, apiCalled, handleUpdateTrending]);
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
        allSongs,
        setAllSongs,
        refreshData,
        setRefreshData,
        apiCalled,
        setApiCalled,
        user,
        login,
        setLogin,
        audioRef,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        currentArray,
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
