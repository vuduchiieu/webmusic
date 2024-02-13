import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./content.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import { again, treding, recommend } from "~/db/songs";
import Login from "./Login/Login";
import Search from "./Search/Search";
import Account from "./Account/Account";

const cx = classNames.bind(styles);

function Content() {
  const {
    themeMode,
    setThemeMode,
    handleSongs,
    avatar,
    search,
    setSearch,
    play,
    like,
    handleLikeToggle,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");

  const handleTheme = () => {
    setThemeMode(!themeMode);
  };

  return (
    <div className={cx("content")}>
      <div className={cx("header")}>
        <div onClick={() => setSearch(false)} className={cx("back")}>
          <img src={icon.back} alt="" />
        </div>
        {search && (
          <div className={cx("search-input")}>
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
              <img src={themeMode ? icon.light : icon.dark} alt="" />
            </div>
            <div className={cx("language")}>
              <img src={icon.en} alt="" />
            </div>
          </div>
          {avatar ? (
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
      ) : (
        <div className={cx("main")}>
          <div className={cx("again")}>
            <h2>Nghe lại</h2>
            <div className={cx("wrap")}>
              {again.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSongs(item)}
                  className={cx("song")}
                >
                  <img src={item.img} alt="" />
                  <h3>{item.title}</h3>
                  <div className={cx("info")}>
                    <p>{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("treding")}>
            <h2>Thịnh hành</h2>
            <div className={cx("wrap")}>
              {treding.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSongs(item)}
                  className={cx("song")}
                >
                  <img src={item.img} alt="" />
                  <h3>{item.title}</h3>
                  <div className={cx("info")}>
                    <p>{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("recommend")}>
            <h2>Có thể bạn sẽ thích</h2>
            <div className={cx("wrap")}>
              {recommend.map((item, i) => (
                <div
                  key={i}
                  className={cx("song", { active: play.title === item.title })}
                >
                  <div
                    className={cx("title")}
                    onClick={() => handleSongs(item)}
                  >
                    <img src={item.img} alt="" />
                    <h3>{item.title}</h3>
                  </div>
                  <div className={cx("info")}>
                    <p>{item.name}</p>
                    <button onClick={() => handleLikeToggle(item.title)}>
                      {like[item.title] ? (
                        <img
                          src={icon.heartActive}
                          style={{ filter: "none" }}
                          alt=""
                        />
                      ) : (
                        <img src={icon.heart} alt="" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
