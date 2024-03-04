import React from "react";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "~/layout/Home/Home.js";
import { useAppContext } from "./component/context/AppContext";
import HomeMobie from "./layout/HomeMobile/HomeMobile";

const cx = classNames.bind();

function App() {
  const { themeMode } = useAppContext();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <Router>
      <div
        className={cx("App", {
          dark: themeMode,
        })}
      >
        <Routes>
          <Route path="/" element={isMobile ? <HomeMobie /> : <Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
