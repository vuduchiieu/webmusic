import React from "react";
import classNames from "classnames/bind";
import styles from "./songs.module.scss";
import { useAppContext } from "../context/AppContext";
import icon from "~/assets/icon";
import { useWheelScroll } from "../useWheelScroll/useWheelScroll";

const cx = classNames.bind(styles);

function Songs({ songs, vertical }) {
  const { handleSongs, play, like, handleLikeToggle, isMobile } =
    useAppContext();
  const elRef = useWheelScroll();

  function formatViews(viewCount) {
    if (viewCount < 1000) {
      return viewCount.toString();
    } else if (viewCount < 1000000) {
      return (viewCount / 1000).toFixed(1) + " N";
    } else {
      return (viewCount / 1000000).toFixed(1) + " Tr";
    }
  }

  return (
    <div
      ref={vertical ? null : elRef}
      className={cx("songs")}
      style={
        vertical && {
          flexWrap: "wrap",
          overflow: "scroll",
          height: "100%",
          width: "100vw",
          padding: 20,
        }
      }
    >
      {songs.map((item, i) => (
        <div
          key={i}
          className={cx("song", { active: play._id === item._id })}
          style={
            isMobile && vertical
              ? {
                  minWidth: "40vw",
                  height: "32vh",
                  marginBottom: 20,
                }
              : vertical
              ? {
                  marginBottom: 20,
                }
              : null
          }
        >
          <div className={cx("title")} onClick={() => handleSongs(item)}>
            <img src={item.image?.url} alt="" />
            <h3>{item.title}</h3>
          </div>
          <div className={cx("info")}>
            <div className={cx("wrap")}>
              <p>{item.author}</p>
              <span>{formatViews(item.view)} lượt nghe</span>
            </div>
            <button onClick={() => handleLikeToggle(item)}>
              {like[item._id] ? (
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
