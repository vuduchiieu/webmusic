import Content from "./Content/Content";
import Navbar from "./Navbar/Navbar";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Control from "./Control/Control";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home")}>
      <div className={cx("main")}>
        <Navbar />
        <Content />
      </div>
      <div className={cx("control")}>
        <Control />
      </div>
    </div>
  );
}

export default Home;
