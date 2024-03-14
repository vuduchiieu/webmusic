import React, { useEffect } from "react";
import classNames from "classnames/bind";
import Home from "~/layout/Home/Home.js";
import { useAppContext } from "./component/context/AppContext";

const cx = classNames.bind();

function App() {
  const { themeMode, play } = useAppContext();
  useEffect(() => {
    document.title =
      play.title && play.author
        ? `${play.title} - ${play.author}`
        : "Stave - Web để nghe nhạc";
  }, [play]);
  return (
    <div
      className={cx("App", {
        dark: themeMode,
      })}
    >
      <Home />
    </div>
  );
}

export default App;
