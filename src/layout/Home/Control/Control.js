import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useAppContext } from "~/component/context/AppContext";
import styles from "./control.module.scss";
import icon from "~/assets/icon";
import { Helmet } from "react-helmet";

const cx = classNames.bind(styles);

function Control() {
  const {
    allSongs,
    treding,
    recommend,
    again,
    listUpload,
    audioRef,
    play,
    setPlay,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    currentTime,
    setCurrentTime,
    isMobile,
    detail,
    setDetail,
  } = useAppContext();
  const [isLooping, setIsLooping] = useState(false);
  const [isForcus, setIsForcus] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [volume, setVolume] = useState(
    parseInt(localStorage.getItem("volume")) || 100
  );

  // Hàm định dạng thời gian
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Xử lý chơi và dừng nhạc
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Xử lý thanh trượt thời gian
  const handleRange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  // Cập nhật thời gian khi đang chạy
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Xử lý khi tệp nhạc đã tải xong
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  // Xử lý thay đổi âm lượng
  const handleVolumeChange = (value) => {
    localStorage.setItem("volume", value);
    audioRef.current.volume = value / 100;
    setIsForcus(true);
    setVolume(value);
  };

  // Tắt tiếng và bật lại
  const handleMute = () => {
    audioRef.current.volume = 0;
    setVolume(0);
    if (volume === 0) {
      audioRef.current.volume = parseInt(localStorage.getItem("volume")) / 100;
      setVolume(parseInt(localStorage.getItem("volume")));
    }
  };

  useEffect(() => {
    audioRef.current.volume =
      parseInt(localStorage.getItem("volume")) / 100 || 100 / 100;
  }, [audioRef]);

  // Xử lý chuyển bài ngẫu nhiên
  const handleRandom = () => {
    setIsRandom(!isRandom);
  };

  // Xử lý lặp lại bài hát
  const handleLoop = () => {
    setIsLooping(!isLooping);
  };

  // Hiển thị control khi rê chuột vào
  const handleMouseEnter = () => {
    setIsForcus(true);
  };

  // Ẩn control khi rời chuột
  const handleMouseLeave = () => {
    if (isForcus === true)
      setTimeout(() => {
        setIsForcus(false);
      }, 5000);
  };

  // Lấy mảng hiện tại
  const currentArray = [allSongs, treding, recommend, again, listUpload].find(
    (array) => array && array.some((song) => song.source === play.source)
  );
  const indexSong = currentArray?.map((item) => item._id).indexOf(play._id);

  // Xử lý chuyển bài tiếp theo
  const handleNext = () => {
    if (currentArray) {
      let nextIndex;

      if (isRandom) {
        nextIndex = Math.floor(Math.random() * currentArray.length);
      } else {
        nextIndex = (indexSong + 1) % currentArray.length;
      }

      const nextSong = currentArray[nextIndex];
      setPlay(nextSong);
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  };

  // Xử lý chuyển bài trước đó
  const handleBackWard = () => {
    if (currentArray) {
      let prevIndex;

      if (isRandom) {
        prevIndex = Math.floor(Math.random() * currentArray.length);
      } else {
        prevIndex = (indexSong - 1 + currentArray.length) % currentArray.length;
      }
      const prevSong = currentArray[prevIndex];

      setPlay(prevSong);
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  };

  // Xử lý sự kiện khi bài hát kết thúc
  const handleAudioEnded = () => {
    handleNext();
  };

  // Xử lý phát hoặc dừng nhạc khi thay đổi trạng thái
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  // Xử lý lặp lại bài hát khi thay đổi trạng thái
  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping, audioRef]);

  //MediaSession
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: play.title || "",
        artist: play.author || "",
        artwork: [
          {
            src: play.image?.url || "https://dummyimage.com/512x512",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
      navigator.mediaSession.setActionHandler("play", () => {
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        handleBackWard();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        handleNext();
      });
    }
  }, [play]);

  return (
    <div
      className={cx("control")}
      style={
        detail
          ? {
              height: "100vh",
              flexDirection: "column",
              alignItems: "center",
            }
          : { height: "8vh" }
      }
    >
      <Helmet>
        <title>
          {play.title && play.author
            ? `${play.title} - ${play.author}`
            : "Stave - Web để nghe nhạc"}
        </title>
      </Helmet>

      <div
        className={cx("info")}
        style={
          detail
            ? {
                flexDirection: "column",
                width: "50%",
                height: "50%",
              }
            : {}
        }
      >
        {play.image && (
          <img
            style={
              detail
                ? {
                    width: "100%",
                  }
                : {}
            }
            src={play.image?.url}
            alt={`Bìa album cho ${play.title || "Tiêu đề không xác định"}`}
          />
        )}
        <div className={cx("title")}>
          <h3>{play.title}</h3>
          <p>{play.author}</p>
        </div>
      </div>
      <div className={cx("control-audio")}>
        <div className={cx("control-bar")}>
          {!isMobile && (
            <button onClick={handleRandom}>
              <img
                className={cx({ active: isRandom })}
                src={icon.random}
                alt=""
              />
            </button>
          )}
          {!isMobile && (
            <button onClick={handleBackWard}>
              <img src={icon.backward} alt="" />
            </button>
          )}
          <button className={cx("play")} onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={icon.pause} alt="" style={{ filter: " none" }} />
            ) : (
              <img src={icon.play} alt="" style={{ filter: " none" }} />
            )}
          </button>
          {!isMobile && (
            <button onClick={handleNext}>
              <img src={icon.forward} alt="" />
            </button>
          )}
          {!isMobile && (
            <button className={cx({ active: isLooping })} onClick={handleLoop}>
              <img src={icon.rectangle} alt="" />
            </button>
          )}
        </div>
        {!isMobile && (
          <div className={cx("range")}>
            <p>{formatTime(currentTime)}</p>
            <input
              type="range"
              value={currentTime}
              step="1"
              min="0"
              max={duration}
              onChange={(e) => handleRange(e.target.value)}
            />
            <p>{formatTime(duration)}</p>
          </div>
        )}
        <audio
          ref={audioRef}
          src={play.song?.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onEnded={handleAudioEnded}
        ></audio>
      </div>
      <div className={cx("more")}>
        {!isMobile && (
          <div className={cx("volume")} style={{ "--volume": `${volume}%` }}>
            <img
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleMute}
              src={
                volume > 60
                  ? icon.speaker
                  : volume > 1 && volume < 60
                  ? icon.medium
                  : icon.mute
              }
              alt=""
            />
            {isForcus && (
              <input
                type="range"
                value={volume}
                step="1"
                min="0"
                max="100"
                onChange={(e) => handleVolumeChange(e.target.value)}
              />
            )}
          </div>
        )}
        <div onClick={() => setDetail(!detail)} className={cx("detail")}>
          <img src={detail ? icon.arrowDown : icon.arrowTop} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Control;
