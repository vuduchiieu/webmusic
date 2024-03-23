import React from "react";
import classNames from "classnames/bind";
import styles from "./songs.module.scss";
import { useAppContext } from "../context/AppContext";
import icon from "~/assets/icon";
import { useWheelScroll } from "../useWheelScroll/useWheelScroll";

const cx = classNames.bind(styles);

function Songs({ songs, vertical, nextSong }) {
  const { handleSongs, play, isMobile, setLogin, user } = useAppContext();
  const elRef = useWheelScroll();
  const handleLikeToggle = async () => {
    if (!user?._id) {
      alert("Bạn cần đăng nhập để thêm bài hát vào yêu thích");
      setLogin(true);
      return;
    }
    alert("Chưa làm xong cái này!");
  };

  const formatViews = (viewCount) => {
    if (viewCount < 1000) {
      return viewCount.toString();
    } else if (viewCount < 1000000) {
      return (viewCount / 1000).toFixed(1) + " N";
    } else {
      return (viewCount / 1000000).toFixed(1) + " Tr";
    }
  };

  return (
    <div
      ref={vertical ? null : elRef}
      className={cx("songs", { nextSong: nextSong })}
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
          onClick={() => {
            nextSong && handleSongs(item);
          }}
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
            <div className={cx("img")}>
              <img src={item.image?.url} alt={item.title} />
              {item.linkytb && (
                <img
                  className={cx("logo-ytb")}
                  src={icon.youtube}
                  alt="youtube"
                />
              )}
            </div>
            {!nextSong && <h3>{item.title}</h3>}
          </div>
          <div className={cx("info")}>
            <div className={cx("wrap")}>
              {nextSong && <h3>{item.title}</h3>}
              <p>{item.author}</p>
              {!nextSong && <span>{formatViews(item.view)} lượt nghe</span>}
            </div>
            {!nextSong && (
              <button onClick={() => handleLikeToggle(item._id)}>
                <img src={false ? icon.heartActive : icon.heart} alt="heart" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Songs;
