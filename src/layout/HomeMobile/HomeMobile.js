import classNames from "classnames/bind";
import styles from "./homeMobile.module.scss";
import Content from "../Home/Content/Content";
import Control from "../Home/Control/Control";

const cx = classNames.bind(styles);

function HomeMobie() {
  return (
    <div className={cx("home-mobile")}>
      <Content />
      <div className={cx("control")}>
        <Control />
      </div>
    </div>
  );
}

export default HomeMobie;
