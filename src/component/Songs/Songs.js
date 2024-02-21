import React from "react";
import classNames from "classnames/bind";
import styles from "./songs.module.scss";
import { useAppContext } from "../context/AppContext";
import icon from "~/assets/icon";

const cx = classNames.bind(styles);

function Songs({ songs }) {
  const { handleSongs, play, like, handleLikeToggle } = useAppContext();
  return (
    <div className={cx("songs")}>
      {songs.map((item, i) => (
        <div
          key={i}
          className={cx("song", { active: play.title === item.title })}
        >
          <div className={cx("title")} onClick={() => handleSongs(item)}>
            <img src={item.image[0].url} alt="" />
            <h3>{item.title}</h3>
          </div>
          <div className={cx("info")}>
            <p>{item.author}</p>
            <button onClick={() => handleLikeToggle(item.title)}>
              {like[item.title] ? (
                <img src={icon.heartActive} alt="" />
              ) : (
                <img src={icon.heart} alt="" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Songs;
