import React from "react";
import classNames from "classnames/bind";
import styles from "./navbar.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "~/component/context/AppContext";
import ListLibrary from "./ListLibrary/ListLibrary";

const cx = classNames.bind(styles);

function Navbar() {
  const { search, setSearch, setLibraryUpload, libraryUpload, handleBack } =
    useAppContext();
  return (
    <div className={cx("navbar")}>
      <div className={cx("control")}>
        <div
          onClick={() => handleBack()}
          className={cx("home", { active: !search && !libraryUpload })}
        >
          <img src={icon.home} alt="home" />
          <h2>Trang chủ</h2>
        </div>
        <div
          onClick={() => {
            setSearch(!search);
            setLibraryUpload(false);
          }}
          className={cx("search", { active: search })}
        >
          <img src={icon.search} alt="search" />
          <h2>Tìm kiếm</h2>
        </div>
      </div>
      <div className={cx("list")}>
        <div className={cx("header")}>
          <div className={cx("wrap")}>
            <div className={cx("title")}>
              <img src={icon.library} alt="library" />
              <h2>Thư viện</h2>
            </div>
            <img width={30} src={icon.add} alt="add" />
          </div>
        </div>
        <ListLibrary />
      </div>
    </div>
  );
}

export default Navbar;
