import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./content.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import Login from "./Login/Login";
import Search from "./Search/Search";
import Account from "./Account/Account";
import Songs from "~/component/Songs/Songs";
import Upload from "./Upload/Upload";
import Library from "../Navbar/Library/Library";
import Profile from "~/component/Profile/Profile";
import Like from "../Navbar/Library/Like";
import Albums from "./Albums/Albums";
import Album from "~/component/Album/Album";

const cx = classNames.bind(styles);

function Content() {
  const {
    themeMode,
    setThemeMode,
    search,
    setSearch,
    again,
    treding,
    recommend,
    user,
    libraryUpload,
    handleBack,
    isModalOpen,
    closeModal,
    isMobile,
    like,
    allSongs,
    openAlbum,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");
  const handleTheme = () => {
    setThemeMode(!themeMode);
  };

  return (
    <>
      <main className={cx("content")}>
        <div className={cx("header")}>
          <div onClick={() => handleBack()} className={cx("back")}>
            <img src={isMobile ? icon.home : icon.back} alt="icon" />
          </div>
          {isMobile && (
            <div className={cx("search-input")}>
              <img src={icon.search} alt="search" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Bạn muốn nghe gì?"
                type="text"
                onFocus={() => setSearch(!search)}
              />
            </div>
          )}
          {!isMobile && search && (
            <div className={cx("search-input")}>
              <img src={icon.search} alt="search" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Bạn muốn nghe gì?"
                type="text"
              />
            </div>
          )}

          <div className={cx("wrap")}>
            <div className={cx("action")}>
              <div onClick={handleTheme} className={cx("theme")}>
                <img src={themeMode ? icon.light : icon.dark} alt="theme" />
              </div>
              <div className={cx("upload")}>
                <Upload />
              </div>
            </div>
            {user ? (
              <div className={cx("account")}>
                <Account />
              </div>
            ) : (
              <div className={cx("login")}>
                <Login />
              </div>
            )}
          </div>
        </div>
        {search ? (
          <Search searchValue={searchValue} />
        ) : libraryUpload ? (
          <Library />
        ) : like ? (
          <Like />
        ) : openAlbum ? (
          <Album />
        ) : (
          <div className={cx("main")}>
            {!user && allSongs && (
              <div className={cx("albums")}>
                <h2>Albums</h2>
                <Albums />
              </div>
            )}
            {again && again.length > 0 && (
              <div className={cx("again")}>
                <h2>Nghe lại</h2>
                <Songs songs={again} />
              </div>
            )}
            {treding && treding.length > 0 && (
              <div className={cx("treding")}>
                <h2>Thịnh hành</h2>
                <Songs songs={treding} />
              </div>
            )}
            {recommend && recommend.length > 0 && (
              <div className={cx("recommend")}>
                <h2>Có thể bạn sẽ thích</h2>
                <Songs songs={recommend} />
              </div>
            )}
          </div>
        )}
      </main>
      <Profile isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Content;
