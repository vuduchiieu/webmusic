import classNames from "classnames/bind";
import styles from "./search.module.scss";
import React, { useEffect, useState } from "react";
import { allSong } from "~/db/songs";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import Songs from "~/component/Songs/Songs";

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
      <Songs songs={result} />
    </div>
  );
}

export default Search;
