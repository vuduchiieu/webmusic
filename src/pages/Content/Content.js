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
    play,
    handleSongs,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");
  const handleTheme = () => {
    setThemeMode(!themeMode);
  };

  const formatViews = (viewCount) => {
    if (viewCount < 1000) {
      return viewCount.toString();
    } else if (viewCount < 1000000) {
      return (viewCount / 1000).toFixed(1) + " N";
    } else {
      return (viewCount / 1000000).toFixed(1) + " Tr";
    }
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
            {treding && treding.length > 0 && (
              <div className={cx("treding")}>
                <div className={cx("songs")}>
                  <div
                    className={cx("top1")}
                    onClick={() => handleSongs(treding[0])}
                  >
                    <img src={treding[0].image.url} alt="" />
                  </div>
                  <div className={cx("topchart")}>
                    <h2>Nghe nhiều nhất</h2>
                    <div className={cx("wrap")}>
                      {treding.slice(1).map((item, i) => (
                        <div
                          key={i}
                          className={cx("song", {
                            active: play._id === item._id,
                          })}
                        >
                          <div
                            onClick={() => handleSongs(item)}
                            className={cx("img")}
                          >
                            <img src={item.image?.url} alt={item.title} />
                            {item.linkytb && (
                              <img
                                className={cx("logo-ytb")}
                                src={icon.youtube}
                                alt="youtube"
                              />
                            )}
                          </div>
                          <div
                            className={cx("title")}
                            onClick={() => handleSongs(item)}
                          >
                            <h3>{item.title}</h3>
                            <p>{item.author}</p>
                            <span>{formatViews(item.view)} lượt nghe</span>
                          </div>
                          <button>
                            <img
                              src={false ? icon.heartActive : icon.heart}
                              alt="heart"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {again && again.length > 0 && (
              <div className={cx("again")}>
                <h2>Nghe lại</h2>
                <Songs songs={again} />
              </div>
            )}

            {recommend && recommend.length > 0 && (
              <div className={cx("recommend")}>
                <h2>Có thể bạn sẽ thích</h2>
                <Songs songs={recommend} />
              </div>
            )}
            {allSongs && (
              <div className={cx("albums")}>
                <h2>Nghệ sĩ</h2>
                <Albums />
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
