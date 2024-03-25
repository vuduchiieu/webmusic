import classNames from "classnames/bind";
import styles from "./albums.module.scss";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Albums() {
  const { allSongs, handleOpenAlb } = useAppContext();

  const sortedSongs = [...allSongs]
    .sort((a, b) => {
      const authorA = a.author.length;
      const authorB = b.author.length;
      return authorA - authorB;
    })
    .slice(0, 25);

  const authors = Array.from(new Set(sortedSongs.map((song) => song.author)));

  return (
    <div className={cx("albums-module")}>
      {authors.map((item, i) => (
        <div onClick={() => handleOpenAlb(item)} key={i}>
          <h3>{item}</h3>
        </div>
      ))}
    </div>
  );
}

export default Albums;
