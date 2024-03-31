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
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();

const Contexts = ({ children }) => {
  // Lấy thông tin người dùng từ Redux
  const user = useSelector((state) => state.auth.login.currentUser);

  // Ref cho audio
  const audioRef = useRef(null);

  // State cho việc tìm kiếm
  const [search, setSearch] = useState(false);

  // State cho danh sách nhạc trong album

  const [album, setAlbum] = useState([]);
  const [openAlbum, setOpenAlbum] = useState(false);

  // State cho danh sách nhạc nghe lại
  const [again, setAgain] = useState([]);

  // State cho danh sách nhạc nổi bật
  const [treding, setTreding] = useState([]);

  // State cho danh sách nhạc đề xuất
  const [recommend, setRecommend] = useState([]);

  // State cho danh sách chúng tôi thích
  const [weLike, setWeLike] = useState([]);

  // State cho danh sách dễ ngủ
  const [easySleep, setEasySleep] = useState([]);

  // State dành cho danh sách sôi động
  const [vibrant, setVibrant] = useState([]);

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

  // Render danh sách nghe lại
  useEffect(() => {
    if (idUser) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API}/v1/songs/listened/${idUser}`
          );
          const decodedToken = jwtDecode(res.data);
          setAgain(
            Object.values(decodedToken)
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
  }, [refreshData, idUser]);

  // Render danh sách nhạc nổi bật
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/v1/songs/trending`
        );
        const decodedToken = jwtDecode(res.data);
        setTreding(
          Object.values(decodedToken)
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
      if (idUser) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API}/v1/songs/recommend/${idUser}`
          );
          const decodedToken = jwtDecode(res.data);
          setRecommend(
            Object.values(decodedToken)
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
  }, [refreshData, idUser]);

  // Render tất cả các bài hát
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/v1/songs`);
        const decodedToken = jwtDecode(res.data);
        setAllSongs(
          Object.values(decodedToken)
            .sort((a, b) => a.title?.localeCompare(b.title))
            .map((song) => ({ ...song, source: "allSong" }))
            .filter((song) => song["status"] === "approved")
        );
        setWeLike(
          Object.values(decodedToken)
            .map((song) => ({ ...song, source: "welike" }))
            .filter(
              (song) =>
                song.title === "Cao Ốc 20" ||
                song.title === "Diễn viên tồi" ||
                song.title === "Ex’s Hate Me (Part 2)" ||
                song.title === "KHÔNG SAO MÀ EM ĐÂY RỒI" ||
                song.title === "Luôn yêu đời (remix)" ||
                song.title === "Rồi Em Sẽ Gặp Một Chàng Trai Khác" ||
                song.title === "Xin Em" ||
                song.title === "ĐỪNG YÊU NỮA, EM MỆT RỒI" ||
                song.title === "ANH ƠI Ở LẠI" ||
                song.title === "Lặng Yên"
            )
        );
        setEasySleep(
          Object.values(decodedToken)
            .map((song) => ({ ...song, source: "easySleep" }))
            .filter(
              (song) =>
                song.title === "‘3107’ full album" ||
                song.title === "Anh Biết Em Cũng Biết" ||
                song.title === "Vì Anh Đâu Có Biết" ||
                song.title === "072019" ||
                song.title === "CHẠM ĐÁY NỖI ĐAU" ||
                song.title === "Chuyện Đôi Ta" ||
                song.title === "Duyên Do Trời, Phận Tại Ta" ||
                song.title === "Khi mà" ||
                song.title === "LỜI XIN LỖI VỤNG VỀ" ||
                song.title === "Nàng Thơ"
            )
        );
        setVibrant(
          Object.values(decodedToken)
            .map((song) => ({ ...song, source: "vibrant" }))
            .filter(
              (song) =>
                song.title === "CROOKED" ||
                song.title === "CRAYON(크레용)" ||
                song.title ===
                  "Đôi mắt, Chạy, Tiền nhiều để làm gì, The right journey" ||
                song.title === "Gene" ||
                song.title === "Một cú lừa" ||
                song.title === "Một triệu like" ||
                song.title === "Ôi Bạn Ơi" ||
                song.title === "SAY EM" ||
                song.title === "Simple Cypher, ok" ||
                song.title === "Simple Cypher, okeokeoke"
            )
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
            `${process.env.REACT_APP_API}/v1/songs/listened/${idUser}/${idSong}`
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
          `${process.env.REACT_APP_API}/v1/songs/trending/${idSong}`
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
    setOpenAlbum(false);
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
  const handleOpenAlb = (author) => {
    setOpenAlbum(!openAlbum);
    setAlbum(
      [...allSongs]
        .filter((item) =>
          item.author.toLowerCase().includes(author.toLowerCase())
        )
        .map((song) => ({ ...song, source: "albums" }))
    );
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
        search,
        setSearch,
        like,
        setLike,
        setLibraryUpload,
        libraryUpload,
        again,
        setAgain,
        treding,
        setTreding,
        recommend,
        setRecommend,
        allSongs,
        setAllSongs,
        easySleep,
        vibrant,
        weLike,
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
        handleOpenAlb,
        album,
        setAlbum,
        openAlbum,
        setOpenAlbum,
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
