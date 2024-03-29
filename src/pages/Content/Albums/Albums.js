import React from "react";
import classNames from "classnames/bind";
import styles from "./albums.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import image from "~/assets/image";

const cx = classNames.bind(styles);

function Albums() {
  const { handleOpenAlb } = useAppContext();

  const albums = [
    {
      author: "MIN",
      cover: image.min,
    },

    {
      author: "Đen",
      cover: image.đen,
    },
    {
      author: "BRay",
      cover: image.bray,
    },
    {
      author: "Low G",
      cover: image.lowg,
    },
    {
      author: "Isaac",
      cover: image.isaac,
    },
    {
      author: "Hiền Hồ",
      cover: image.hienho,
    },
    {
      author: "Quân A.P",
      cover: image.min,
    },
    {
      author: "G-DRAGON",
      cover: image.min,
    },
    {
      author: "BIGBANG",
      cover: image.min,
    },
    {
      author: "Bảo Anh",
      cover: image.min,
    },
    {
      author: "ERIK",
      cover: image.min,
    },
    {
      author: "Bích Phương",
      cover: image.min,
    },
  ];
  return (
    <div className={cx("albums-module")}>
      {albums.map((item, i) => (
        <div
          className={cx("album")}
          onClick={() => handleOpenAlb(item.author)}
          key={i}
        >
          <img src={item.cover} alt={item.author} />
        </div>
      ))}
    </div>
  );
}

export default Albums;
