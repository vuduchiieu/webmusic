import React from "react";
import classNames from "classnames/bind";
import styles from "./library.module.scss";
import Songs from "~/component/Songs/Songs";

const cx = classNames.bind(styles);

function Like() {
  const vertical = true;
  return (
    <div className={cx("library")}>
      <Songs songs={[]} vertical={vertical} />
    </div>
  );
}

export default Like;
