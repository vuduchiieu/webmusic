import classNames from "classnames/bind";
import styles from "./search.module.scss";
import React, { useEffect, useState } from "react";
import { allSong } from "~/db/songs";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";

const cx = classNames.bind(styles);

function Search({ searchValue }) {
  const { handleSongs, play, handleLikeToggle, like } = useAppContext();
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (!searchValue) {
      setResult([]);
      return;
    }
    const filterResult = [...allSong].filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResult(filterResult);
  }, [searchValue]);
  return (
    <div className={cx("search")}>
      {result.map((item, i) => (
        <div
          key={i}
          className={cx("song", { active: play.title === item.title })}
        >
          <div className={cx("title")} onClick={() => handleSongs(item)}>
            <img src={item.img} alt="" />
            <h3>{item.title}</h3>
          </div>
          <div className={cx("info")}>
            <p>{item.name}</p>
            <button onClick={() => handleLikeToggle(item.title)}>
              {like[item.title] ? (
                <img src={icon.heartActive} style={{ filter: "none" }} alt="" />
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

export default Search;
