import React, { useEffect } from "react";
import classNames from "classnames/bind";
import Pages from "~/pages/Pages.jsx";
import { useAppContext } from "./component/context/AppContext";

const cx = classNames.bind();

function App() {
  const { themeMode, play } = useAppContext();
  useEffect(() => {
    document.title =
      play.title && play.author
        ? `${play.title} - ${play.author}`
        : "Stave - web để nghe nhạc";
  }, [play]);
  return (
    <div
      className={cx("App", {
        dark: themeMode,
      })}
    >
      <Pages />
    </div>
  );
}

export default App;
