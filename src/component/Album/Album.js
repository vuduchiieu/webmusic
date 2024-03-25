import classNames from "classnames/bind";
import styles from "./album.module.scss";
import Songs from "../Songs/Songs";
import { useAppContext } from "../context/AppContext";

const cx = classNames.bind(styles);

function Album() {
  const { album } = useAppContext();
  const vertical = true;

  return (
    <div className={cx("album")}>
      <Songs songs={album} vertical={vertical} />
    </div>
  );
}

export default Album;
