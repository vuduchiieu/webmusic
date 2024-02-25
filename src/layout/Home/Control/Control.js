import classNames from "classnames/bind";
import styles from "./control.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import icon from "~/assets/icon";
import { recommend, treding } from "~/db/songs";
import axios from "axios";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Control() {
  const {
    play,
    setPlay,
    isPlaying,
    setIsPlaying,
    again,
    setRefreshData,
    apiCalled,
    setApiCalled,
  } = useAppContext();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isForcus, setIsForcus] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [volume, setVolume] = useState(100);

  // Lấy mảng hiện tại
  const currentArray = [treding, recommend, again].find(
    (array) => array && array.some((song) => song.title === play.title)
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
    audioRef.current.volume = value / 100;
    setIsForcus(true);
    setVolume(value);
  };

  // Tắt tiếng và bật lại
  const handleMute = () => {
    audioRef.current.volume = 0;
    setVolume(0);
    if (volume === 0) {
      audioRef.current.volume = volume / 100;
    }
  };

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

  // Xử lý chuyển bài tiếp theo
  const handleNext = () => {
    if (currentArray) {
      const nextSongIndex = isRandom
        ? Math.floor(Math.random() * currentArray.length)
        : (currentArray.indexOf(play) + 1) % currentArray.length;

      const nextSong = currentArray[nextSongIndex];

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
      const currentIndex = currentArray.findIndex(
        (song) => song.id === play.id
      );

      const prevIndex = isRandom
        ? Math.floor(Math.random() * currentArray.length)
        : (currentIndex - 1 + currentArray.length) % currentArray.length;

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

  const user = useSelector((state) => state.auth.login.currentUser);

  const idUser = user?._id;
  const idSong = play?._id;
  const handleSongProgress = () => {
    const percentageListened = Math.floor((currentTime / duration) * 100);
    if (percentageListened >= 50 && !apiCalled) {
      axios
        .put(`https://be-song.vercel.app/v1/songs/listened/${idUser}/${idSong}`)
        .then(() => {
          setRefreshData(true);
          setApiCalled(true);
        })
        .catch((error) => {
          console.error("Error adding song to listen again list:", error);
        });
    }
  };

  useEffect(() => {
    handleSongProgress();
  }, [currentTime, duration, idSong, idUser, apiCalled]);

  // Xử lý phát hoặc dừng nhạc khi thay đổi trạng thái
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Xử lý lặp lại bài hát khi thay đổi trạng thái
  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping]);

  return (
    <div className={cx("control")}>
      <div className={cx("info")}>
        {play.image && <img src={play.image?.url} alt="" />}
        <div className={cx("title")}>
          <h3>{play.title}</h3>
          <p>{play.author}</p>
        </div>
      </div>
      <div className={cx("control-audio")}>
        <div className={cx("control-bar")}>
          <button onClick={handleRandom}>
            <img
              className={cx({ active: isRandom })}
              src={icon.random}
              alt=""
            />
          </button>
          <button onClick={handleBackWard}>
            <img src={icon.backward} alt="" />
          </button>
          <button className={cx("play")} onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={icon.pause} alt="" />
            ) : (
              <img src={icon.play} alt="" />
            )}
          </button>
          <button onClick={handleNext}>
            <img src={icon.forward} alt="" />
          </button>
          <button className={cx({ active: isLooping })} onClick={handleLoop}>
            <img src={icon.rectangle} alt="" />
          </button>
        </div>
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
        <audio
          ref={audioRef}
          src={play.song?.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onEnded={handleAudioEnded}
        ></audio>
      </div>
      <div className={cx("more")}>
        <div className={cx("volume")} style={{ "--volume": `${volume}%` }}>
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
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMute}
            src={volume > 0 ? icon.speaker : icon.mute}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Control;
