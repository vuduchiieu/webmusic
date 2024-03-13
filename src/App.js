import React from "react";
import { Helmet } from "react-helmet";
import classNames from "classnames/bind";
import Home from "~/layout/Home/Home.js";
import { useAppContext } from "./component/context/AppContext";

const cx = classNames.bind();

function App() {
  const { themeMode, play } = useAppContext();

  return (
    <div
      className={cx("App", {
        dark: themeMode,
      })}
    >
      <Home />
      <Helmet>
        <title>
          {play.title && play.author
            ? `${play.title} - ${play.author}`
            : "Stave - Web để nghe nhạc"}
        </title>
      </Helmet>
    </div>
  );
}

export default App;
