import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./content.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import { again, treding, recommend } from "~/db/songs";
import Login from "./Login/Login";
import Search from "./Search/Search";
import Account from "./Account/Account";
import { useSelector } from "react-redux";
import Songs from "~/component/Songs/Songs";

const cx = classNames.bind(styles);

function Content() {
  const { themeMode, setThemeMode, search, setSearch } = useAppContext();

  const [searchValue, setSearchValue] = useState("");

  const handleTheme = () => {
    setThemeMode(!themeMode);
  };

  const user = useSelector((state) => state.auth.login.currentUser);

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
      ) : (
        <div className={cx("main")}>
          <div className={cx("again")}>
            <h2>Nghe lại</h2>
            <Songs songs={again} />
          </div>
          <div className={cx("treding")}>
            <h2>Thịnh hành</h2>
            <Songs songs={treding} />
          </div>
          <div className={cx("recommend")}>
            <h2>Có thể bạn sẽ thích</h2>
            <Songs songs={recommend} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
