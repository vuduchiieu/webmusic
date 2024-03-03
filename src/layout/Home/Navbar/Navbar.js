import React from "react";
import classNames from "classnames/bind";
import styles from "./navbar.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Navbar() {
  const {
    search,
    setSearch,
    setLibraryUpload,
    libraryUpload,
    handleBack,
    user,
  } = useAppContext();
  return (
    <div className={cx("navbar")}>
      <div className={cx("control")}>
        <div onClick={() => handleBack()} className={cx("home")}>
          <img src={icon.home} alt="" />
          <h2>Trang chủ</h2>
        </div>
        <div
          onClick={() => {
            setSearch(!search);
            setLibraryUpload(false);
          }}
          className={cx("search")}
        >
          <img src={icon.search} alt="" />
          <h2>Tìm kiếm</h2>
        </div>
      </div>
      <div className={cx("list")}>
        <div className={cx("header")}>
          <div className={cx("wrap")}>
            <div className={cx("title")}>
              <img src={icon.library} alt="" />
              <h2>Thư viện</h2>
            </div>
            <img width={30} src={icon.add} alt="" />
          </div>
        </div>
        <div className={cx("list-library")}>
          <div className={cx("like")}>
            <h3>Yêu thích</h3>
          </div>
          {user && (
            <div
              className={cx("upload", { active: libraryUpload })}
              onClick={() => {
                setLibraryUpload(!libraryUpload);
                setSearch(false);
              }}
            >
              <h3>
                Tải lên của:{" "}
                <span style={{ fontWeight: 700 }}>{user.username}</span>
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
