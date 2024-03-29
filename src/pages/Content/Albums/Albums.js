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
      cover: image.quanap,
    },
    {
      author: "G-DRAGON",
      cover: image.gdragon,
    },
    {
      author: "BIGBANG",
      cover: image.bigbang,
    },
    {
      author: "Bảo Anh",
      cover: image.baoanh,
    },
    {
      author: "ERIK",
      cover: image.erik,
    },
    {
      author: "Bích Phương",
      cover: image.bichphuong,
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
