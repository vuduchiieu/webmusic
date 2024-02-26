import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import Tippy from "@tippyjs/react/headless";
import icon from "~/assets/icon";
import React, { useState } from "react";
import axios from "axios";
import { allSong } from "~/db/songs";

const cx = classNames.bind(styles);

function Upload() {
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState({});

  const handleMultipleSubmit = (e) => {
    const selectedFiles = e.target.files;
    const filesObject = {};
    for (let i = 0; i < selectedFiles.length; i++) {
      const key = `file${i + 1}`;
      filesObject[key] = selectedFiles[i];
    }
    setFiles(filesObject);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        formData.append("files", files[key]);
      }
    }
    formData.append("isPublic", true);
    const titleAllSong = allSong.map((item) => item.title);
    try {
      if (!titleAllSong.includes(title)) {
        setLoading(true);
        await axios
          .post("http://localhost:3001/v1/songs", formData)
          .then((res) => console.log(res.data));
        setUpload(false);
        setTitle("");
        setAuthor("");
        setFiles({});
        alert("Đăng thành công");
      } else {
        alert("Bài hát đã tồn tại trong danh sách");
      }
    } catch (error) {
      alert("Đăng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={upload}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("upload-model")}>
          <h1>Tải lên bài gì đó...</h1>
          <form onSubmit={handlePost} className={cx("normally")}>
            <div className={cx("title")}>
              <p>Tên bài hát</p>
              <input
                value={title}
                placeholder="Tên bài hát"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={cx("author")}>
              <p>Nhạc sĩ</p>
              <input
                value={author}
                placeholder="Nhạc sĩ"
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className={cx("audio")}>
              <input
                type="file"
                id="file"
                multiple
                onChange={handleMultipleSubmit}
              />
              <label htmlFor="file">
                {Object.keys(files).length > 0 ? (
                  <img src={icon.ok} style={{ filter: "none" }} alt="" />
                ) : (
                  <img
                    src={icon.uploadMedia}
                    style={{ filter: "none" }}
                    alt=""
                  />
                )}
              </label>

              <p>Thêm tệp âm thanh và ảnh</p>
            </div>

            <div className={cx("action")}>
              <button type="submit">
                {loading ? <img src={icon.loading} alt="" /> : <p>Đăng</p>}
              </button>
            </div>
          </form>
        </div>
      )}
      onClickOutside={() => setUpload(!upload)}
    >
      <div className={cx("upload")}>
        <button onClick={() => setUpload(!upload)}>
          <img src={icon.upload} alt="" />
        </button>
      </div>
    </Tippy>
  );
}

export default Upload;
