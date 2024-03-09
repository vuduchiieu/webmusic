import React from "react";
import classNames from "classnames/bind";
import styles from "./detail.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import Control from "../Control/Control";

const cx = classNames.bind(styles);

function Detail() {
  const { setDetail } = useAppContext();
  return (
    <div className={cx("detail")}>
      <div className={cx("header")}>
        <img onClick={() => setDetail(false)} src={icon.arrowDown} alt="" />
      </div>
      <div>
        <Control />
      </div>
    </div>
  );
}

export default Detail;
