import classNames from "classnames/bind";
import styles from "./navbar.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Navbar() {
  const { search, setSearch } = useAppContext();
  return (
    <div className={cx("navbar")}>
      <div className={cx("control")}>
        <div className={cx("home")}>
          <img src={icon.home} alt="" />
          <h2>Trang chủ</h2>
        </div>
        <div onClick={() => setSearch(!search)} className={cx("search")}>
          <img src={icon.search} alt="" />
          <h2>Tìm kiếm</h2>
        </div>
      </div>
      <div className={cx("list")}></div>
    </div>
  );
}

export default Navbar;
