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
  const { themeMode, setThemeMode, handleSongs, avatar, search, setSearch } =
    useAppContext();

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
            <input type="text" />
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
        <Search />
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
                    <p>{item.name}.</p>
                    <p>{item.view} lượt xem</p>
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
                    <p>{item.view} view</p>
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
                  onClick={() => handleSongs(item)}
                  className={cx("song")}
                >
                  <img src={item.img} alt="" />
                  <h3>{item.title}</h3>
                  <div className={cx("info")}>
                    <p>{item.name}</p>
                    <div className={cx("view")}>
                      <span>{item.view}</span>
                      <img src={icon.view} alt="" />
                    </div>
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
