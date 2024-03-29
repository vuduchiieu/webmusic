import React from "react";
import classNames from "classnames/bind";
import styles from "./library.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import Songs from "~/component/Songs/Songs";

const cx = classNames.bind(styles);

function Library() {
  const { listUpload } = useAppContext();

  const vertical = true;
  return (
    <div className={cx("library")}>
      <Songs songs={listUpload} vertical={vertical} />
    </div>
  );
}

export default Library;
