import classNames from "classnames/bind";
import styles from "./content.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import { again, treding, recommend } from "~/db/songs";

const cx = classNames.bind(styles);

function Content() {
  const { themeMode, setThemeMode, handleSongs } = useAppContext();

  const handleTheme = () => {
    setThemeMode(!themeMode);
  };
  return (
    <div className={cx("content")}>
      <div className={cx("header")}>
        <div className={cx("back")}>
          <img src={icon.back} />
        </div>
        <div className={cx("wrap")}>
          <div className={cx("action")}>
            <div onClick={handleTheme} className={cx("theme")}>
              <img src={themeMode ? icon.light : icon.dark} />
            </div>
            <div className={cx("language")}>
              <img src={icon.en} />
            </div>
          </div>
          {/* <div className={cx("account")}>
            <img src={img.luonyeudoi} />
          </div> */}
          <div className={cx("login")}>
            <button>
              <p>Login</p>
            </button>
          </div>
        </div>
      </div>
      <div className={cx("main")}>
        <div className={cx("again")}>
          <h2>Nghe lại</h2>
          <div className={cx("wrap")}>
            {again.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  handleSongs(item);
                }}
                className={cx("song")}
              >
                <img src={item.img} />
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
                <img src={item.img} />
                <h3>{item.title}</h3>
                <div className={cx("info")}>
                  <p>{item.name}</p>
                  <p>{item.view} lượt xem</p>
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
                <img src={item.img} />
                <h3>{item.title}</h3>
                <div className={cx("info")}>
                  <p>{item.name}</p>
                  <p>{item.view} lượt xem</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
