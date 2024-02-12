import classNames from "classnames/bind";
import styles from "./search.module.scss";
import React, { useEffect, useState } from "react";
import { allSong } from "~/db/songs";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Search({ searchValue }) {
  const { handleSongs } = useAppContext();
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
        <div key={i} onClick={() => handleSongs(item)} className={cx("song")}>
          <img src={item.img} alt="" />
          <h3>{item.title}</h3>
          <div className={cx("info")}>
            <p>{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Search;
