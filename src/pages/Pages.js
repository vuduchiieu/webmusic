import React from "react";
import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import classNames from "classnames/bind";
import styles from "./pages.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import Control from "./Control/Control";

const cx = classNames.bind(styles);

function Pages() {
  const { play, isMobile } = useAppContext();
  return (
    <div className={cx("pages")}>
      <div className={cx("main")}>
        {!isMobile && <Navbar />}
        <Content />
      </div>
      <div
        className={cx("control")}
        style={play.length === 0 ? { display: "none" } : { display: "block" }}
      >
        <Control />
      </div>
    </div>
  );
}

export default Pages;
