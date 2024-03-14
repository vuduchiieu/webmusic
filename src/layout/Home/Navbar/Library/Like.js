import React from "react";
import classNames from "classnames/bind";
import styles from "./library.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import Songs from "~/component/Songs/Songs";

const cx = classNames.bind(styles);

function Like() {
  const { listLike } = useAppContext();
  const vertical = true;
  return (
    <div className={cx("library")}>
      <Songs songs={listLike} vertical={vertical} />
    </div>
  );
}

export default Like;
