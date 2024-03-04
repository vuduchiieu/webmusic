import React from "react";

import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Control from "./Control/Control";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Home() {
  const { play, isMobile } = useAppContext();
  return (
    <div className={cx("home")}>
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

export default Home;
