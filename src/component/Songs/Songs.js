import React from "react";
import classNames from "classnames/bind";
import styles from "./songs.module.scss";
import { useAppContext } from "../context/AppContext";
import icon from "~/assets/icon";
import { useHorizontalScroll } from "../useHorizontalScroll/useHorizontalScroll";

const cx = classNames.bind(styles);

function Songs({ songs, search }) {
  const { handleSongs, play, like, handleLikeToggle } = useAppContext();
  const elRef = useHorizontalScroll();
  return (
    <div
      ref={elRef}
      className={cx("songs")}
      style={
        search && {
          flexWrap: "wrap",
          overflow: "scroll",
          height: "100%",
          width: "78vw",
          padding: 20,
        }
      }
    >
      {songs.map((item, i) => (
        <div
          key={i}
          className={cx("song", { active: play.title === item.title })}
          style={
            search && {
              marginBottom: 20,
            }
          }
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
