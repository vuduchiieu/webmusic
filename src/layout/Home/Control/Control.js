import classNames from "classnames/bind";
import styles from "./control.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import icon from "~/assets/icon";

const cx = classNames.bind(styles);

function Control() {
  const {
    play,
    handleNext,
    isPlaying,
    setIsPlaying,
    isRandom,
    setIsRandom,
    handleBackWard,
  } = useAppContext();
  const audioRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isForcus, setIsForcus] = useState(false);

  const [volume, setVolume] = useState(
    parseInt(localStorage.getItem("volume")) || 100
  );

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
    setIsForcus(true);
    setVolume(value);
  };

  const handleMute = () => {
    audioRef.current.volume = 0;
    setVolume(0);
    if (volume === 0) {
      audioRef.current.volume = parseInt(localStorage.getItem("volume")) / 100;
      setVolume(parseInt(localStorage.getItem("volume")));
    }
  };
  const handleRandom = () => {
    setIsRandom(!isRandom);
  };
  const handleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleMouseEnter = () => {
    setIsForcus(true);
  };

  const handleMouseLeave = () => {
    if (isForcus === true)
      setTimeout(() => {
        setIsForcus(false);
      }, 5000);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.loop = isLooping;
  }, [isLooping]);

  useEffect(() => {
    if (currentTime === duration) {
      handleNext();
    }
  }, [currentTime, duration]);

  return (
    <div className={cx("control")}>
      <div className={cx("info")}>
        {play.img && <img src={play.img} />}
        <div className={cx("title")}>
          <h3>{play.title}</h3>
          <p>{play.name}</p>
        </div>
      </div>
      <div className={cx("control-audio")}>
        <div className={cx("control-bar")}>
          <button onClick={handleRandom}>
            <img className={cx({ active: isRandom })} src={icon.random} />
          </button>
          <button onClick={handleBackWard}>
            <img src={icon.backward} />
          </button>
          <button className={cx("play")} onClick={handlePlayPause}>
            {isPlaying ? <img src={icon.pause} /> : <img src={icon.play} />}
          </button>
          <button onClick={handleNext}>
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
          />
        </div>
      </div>
    </div>
  );
}

export default Control;
