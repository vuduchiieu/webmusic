import classNames from "classnames/bind";
import styles from "./search.module.scss";
import React, { useEffect, useState } from "react";
import Songs from "~/component/Songs/Songs";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Search({ searchValue }) {
  const { allSongs } = useAppContext();
  const [result, setResult] = useState([]);
  const vertical = true;
  useEffect(() => {
    if (searchValue === "") {
      setResult(allSongs);
      return;
    }

    const filterResult = [...allSongs].filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setResult(filterResult);
  }, [searchValue, allSongs]);

  return (
    <div className={cx("search")}>
      <Songs songs={result} vertical={vertical} />
    </div>
  );
}

export default Search;
