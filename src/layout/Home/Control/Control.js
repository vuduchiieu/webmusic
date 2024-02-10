import classNames from "classnames/bind";
import styles from "./control.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import icon from "~/assets/icon";

const cx = classNames.bind(styles);

function Control() {
  const { play, isPlaying, setIsPlaying } = useAppContext();
  const audioRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const [volume, setVolume] = useState(
    parseInt(localStorage.getItem("volume")) || 100
  );

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRange = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleVolumeChange = (value) => {
    localStorage.setItem("volume", value);
    audioRef.current.volume = value / 100;
    setVolume(value);
  };

  const handleLoop = () => {
    setIsLooping(!isLooping);
  };

  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping]);

  return (
    <div className={cx("control")}>
      <div className={cx("info")}>
        <img src={play.img} />
        <div className={cx("title")}>
          <h3>{play.title}</h3>
          <p>{play.name}</p>
        </div>
      </div>
      <div className={cx("control-audio")}>
        <div className={cx("control-bar")}>
          <button>
            <img src={icon.random} />
          </button>
          <button>
            <img src={icon.backward} />
          </button>
          <button className={cx("play")} onClick={handlePlayPause}>
            {isPlaying ? <img src={icon.pause} /> : <img src={icon.play} />}
          </button>
          <button>
            <img src={icon.forward} />
          </button>
          <button className={cx({ active: isLooping })} onClick={handleLoop}>
            <img src={icon.rectangle} />
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
          src={play.lyric}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
        ></audio>
      </div>
      <div className={cx("more")}>
        <div className={cx("volume")} style={{ "--volume": `${volume}%` }}>
          <img src={icon.speaker} />
          <input
            type="range"
            value={volume}
            step="1"
            min="0"
            max="100"
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Control;
