import React from "react";
import classNames from "classnames/bind";
import styles from "./homeMobile.module.scss";
import Content from "../Home/Content/Content";
import Control from "../Home/Control/Control";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function HomeMobie() {
  const { play } = useAppContext();
  return (
    <div className={cx("home-mobile")}>
      <Content />
      <div
        className={cx("control")}
        style={play.length === 0 ? { display: "none" } : { display: "block" }}
      >
        <Control />
      </div>
    </div>
  );
}

export default HomeMobie;
