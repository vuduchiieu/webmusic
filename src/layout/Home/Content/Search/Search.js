import classNames from "classnames/bind";
import styles from "./search.module.scss";
import React, { useEffect, useState } from "react";
import Songs from "~/component/Songs/Songs";
import axios from "axios";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Search({ searchValue }) {
  const { setAllSongs, allSongs, setRefreshData } = useAppContext();
  const [result, setResult] = useState([]);
  const search = true;
  useEffect(() => {
    if (!searchValue) {
      setResult([]);
      return;
    }
    if (searchValue === " ") {
      setResult(allSongs);
      return;
    }

    const filterResult = [...allSongs].filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResult(filterResult);
  }, [searchValue, allSongs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAllSong = await axios.get(
          "https://be-song.vercel.app/v1/songs/"
        );
        setAllSongs(
          resAllSong.data.allSong
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((song) => ({ ...song, source: "allSong" }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRefreshData(false);
      }
    };
    fetchData();
  }, [setRefreshData, setAllSongs]);
  return (
    <div className={cx("search")}>
      <Songs songs={result} search={search} />
    </div>
  );
}

export default Search;
