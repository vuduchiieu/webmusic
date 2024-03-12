import React from "react";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "~/layout/Home/Home.js";
import { useAppContext } from "./component/context/AppContext";
import { Helmet } from "react-helmet";

const cx = classNames.bind();

function App() {
  const { themeMode, play } = useAppContext();

  return (
    <Router>
      <div
        className={cx("App", {
          dark: themeMode,
        })}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Helmet>
        <title>
          {play.title && play.author
            ? `${play.title} - ${play.author}`
            : "Stave - Web để nghe nhạc"}
        </title>
      </Helmet>
    </Router>
  );
}

export default App;
