import React from "react";
import classNames from "classnames/bind";
import styles from "./listLibrary.module.scss";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function ListLibrary() {
  const { setLibraryUpload, libraryUpload, setSearch, user, like, setLike } =
    useAppContext();

  return (
    <div className={cx("list-library")}>
      <div
        onClick={() => {
          setLike(!like);
          setSearch(false);
          setLibraryUpload(false);
        }}
        className={cx("like", { active: like })}
      >
        <h2>Yêu thích</h2>
      </div>
      {user && (
        <div
          className={cx("upload", { active: libraryUpload })}
          onClick={() => {
            setLike(false);
            setLibraryUpload(!libraryUpload);
            setSearch(false);
          }}
        >
          <h2>
            Tải lên của:{" "}
            <span style={{ fontWeight: 700 }}>{user.username}</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default ListLibrary;
