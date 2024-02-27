import React from "react";
import { SpeeInsights } from "@vercel/speed-insights/react";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "~/layout/Home/Home.js";
import { useAppContext } from "./component/context/AppContext";

const cx = classNames.bind();

function App() {
  const { themeMode } = useAppContext();
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
        <SpeeInsights />
      </div>
    </Router>
  );
}

export default App;
