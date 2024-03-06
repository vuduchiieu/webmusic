import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import Tippy from "@tippyjs/react/headless";
import icon from "~/assets/icon";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Upload() {
  const { user, setLogin, allSongs } = useAppContext();
  const [swap, setSwap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState({});
  const [uploadYtb, setUploadYtb] = useState("");
  const [titleYtb, setTitleYtb] = useState("");
  const [authorYtb, setAuthorYtb] = useState("");
  const [coverYtb, setCoverYtb] = useState("");
  const [srcYtb, setSrcYtb] = useState("");
  const titleAllSong = allSongs.map((item) => item.title);

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
    if (!user) {
      setUpload(false);
      alert("bạn cần đăng nhập để tải lên bài hát.");
      setLogin(true);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        formData.append("files", files[key]);
      }
    }
    formData.append("isPublic", true);

    try {
      if (!titleAllSong.includes(title)) {
        setLoading(true);
        await axios.post(
          `http://localhost:3001/v1/songs/${user._id}`,
          formData
        );
        // be-song-dbac8dd7b6a3.herokuapp.com
        setUpload(false);
        setTitle("");
        setAuthor("");
        setFiles({});

        alert("Đợi chúng tôi duyệt là bài của bạn sẽ được hiển thị");
      } else {
        alert("Bài hát đã tồn tại trong danh sách");
      }
    } catch (error) {
      console.log(error);
      alert("Đăng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handlePostYtb = async (e) => {
    e.preventDefault();
    if (!user) {
      setUpload(false);
      alert("bạn cần đăng nhập để tải lên bài hát.");
      setLogin(true);
      return;
    }
    const formData = new FormData();
    formData.append("title", titleYtb);
    formData.append("author", authorYtb);
    formData.append("image", coverYtb);
    formData.append("song", srcYtb);
    formData.append("isPublic", true);

    try {
      if (!titleAllSong.includes(title)) {
        setLoading(true);
        await axios.post(
          `https://be-song.vercel.app/v1/songs/ytb/${user._id}`,
          formData
        );
        setUpload(false);
        setTitleYtb("");
        setAuthorYtb("");
        setCoverYtb("");
        setSrcYtb("");

        alert("Đợi chúng tôi duyệt là bài của bạn sẽ được hiển thị");
      } else {
        alert("Bài hát đã tồn tại trong danh sách");
      }
    } catch (error) {
      console.log(error);
      alert("Đăng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadYtb = async () => {
    try {
      setUploadYtb("");
      const response = await axios.get(
        `https://be-song.vercel.app/v1/songs/ytb?url=${uploadYtb}`
      );

      const { title, author, cover, url } = response.data;
      setTitleYtb(title);
      setAuthorYtb(author);
      setCoverYtb(cover);
      setSrcYtb(url);
    } catch (error) {
      alert("Gửi lên thất bại");
    }
  };
  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={upload}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("upload-model")}>
          {swap ? <h1>Tải bằng link ytb</h1> : <h1>Tải lên bài gì đó...</h1>}
          <p>Bạn thích còn chúng tôi thì chưa chắc 🤣</p>
          {swap && (
            <div className={cx("upload-ytb")}>
              <p>Link yêu từ bé</p>
              <input
                type="text"
                name=""
                id=""
                value={uploadYtb}
                placeholder="Link bài hát bạn thích"
                onChange={(e) => setUploadYtb(e.target.value)}
              />
              <button onClick={handleUploadYtb}>Gửi</button>
            </div>
          )}
          {swap ? (
            <form onSubmit={handlePostYtb} className={cx("normally")}>
              <div className={cx("title")}>
                <p>Tên bài hát</p>
                <input
                  value={titleYtb}
                  placeholder="Tên bài hát"
                  type="text"
                  onChange={(e) => setTitleYtb(e.target.value)}
                />
              </div>
              <div className={cx("author")}>
                <p>Nhạc sĩ</p>
                <input
                  value={authorYtb}
                  placeholder="Nhạc sĩ"
                  type="text"
                  onChange={(e) => setAuthorYtb(e.target.value)}
                />
              </div>
              <div className={cx("action")}>
                <button type="submit">
                  {loading ? <img src={icon.loading} alt="" /> : <p>Đăng</p>}
                </button>
              </div>
            </form>
          ) : (
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
          )}

          <p onClick={() => setSwap(!swap)}>upload bằng link yêu từ bé</p>
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
