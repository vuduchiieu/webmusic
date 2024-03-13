import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import Tippy from "@tippyjs/react/headless";
import icon from "~/assets/icon";
import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Upload() {
  const { user, setLogin, allSongs } = useAppContext();
  const [swap, setSwap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGetLink, setLoadingGetLink] = useState(false);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState({});
  const [uploadYtb, setUploadYtb] = useState("");
  const [titleYtb, setTitleYtb] = useState("");
  const [authorYtb, setAuthorYtb] = useState("");
  const [coverYtb, setCoverYtb] = useState({ url: "" });
  const [srcYtb, setSrcYtb] = useState({ url: "" });
  const [linkytb, setLinkytb] = useState("");
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
    if (!user || !title || !author || Object.keys(files).length === 0) {
      setUpload(false);
      alert("Vui lòng điền đầy đủ thông tin và tải lên tệp âm thanh.");
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
          `https://be-stave-6c9234b70089.herokuapp.com/v1/songs/${user._id}`,
          formData
        );
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
    if (!user || !titleYtb || !authorYtb || !coverYtb.url || !srcYtb.url) {
      setUpload(false);
      alert("Vui lòng điền đầy đủ thông tin và kiểm tra link YouTube.");
      return;
    }
    const newSong = {
      title: titleYtb,
      author: authorYtb,
      cover: { url: coverYtb.url, publicId: "" },
      url: { url: srcYtb.url, publicId: "" },
      isPublic: true,
      linkytb: linkytb,
    };

    try {
      if (!titleAllSong.includes(title)) {
        setLoading(true);
        await axios.post(
          `https://be-song.vercel.app/v1/songs/ytb/${user._id}`,
          newSong
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

  const handleGetYtb = async () => {
    try {
      setLoadingGetLink(true);
      setUploadYtb("");
      const response = await axios.get(
        `https://be-song.vercel.app/v1/songs/ytb?url=${uploadYtb}`
      );
      const { title, author, cover, url, link } = response.data;
      setTitleYtb(title);
      setAuthorYtb(author);
      setCoverYtb({ url: cover });
      setSrcYtb({ url: url });
      setLinkytb(link);
    } catch (error) {
      alert("Link không hợp lệ");
    } finally {
      setLoadingGetLink(false);
    }
  };
  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={upload}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("upload-model")}>
          <div className={cx("header")}>
            <h1>Tải lên</h1>
            <p>Bạn thích còn chúng tôi thì chưa chắc 🤣</p>
          </div>
          {swap && (
            <div className={cx("getlink")}>
              <input
                type="text"
                name=""
                id=""
                value={uploadYtb}
                placeholder="Link youtube"
                className={cx("inputgetlink")}
                onChange={(e) => setUploadYtb(e.target.value)}
              />
              <button onClick={handleGetYtb}>
                {loadingGetLink ? (
                  <img
                    className={cx("loading")}
                    src={icon.loading}
                    alt="loading"
                  />
                ) : (
                  <img src={icon.arrowNext} alt="next" />
                )}
              </button>
            </div>
          )}
          {swap ? (
            <form onSubmit={handlePostYtb} className={cx("form")}>
              <div className={cx("title")}>
                <input
                  value={titleYtb}
                  placeholder="Tên bài hát"
                  type="text"
                  onChange={(e) => setTitleYtb(e.target.value)}
                />
              </div>
              <div className={cx("author")}>
                <input
                  value={authorYtb}
                  placeholder="Nhạc sĩ"
                  type="text"
                  onChange={(e) => setAuthorYtb(e.target.value)}
                />
              </div>
              <div className={cx("action")}>
                <button type="submit">
                  {loading ? (
                    <img
                      className={cx("loading")}
                      src={icon.loading}
                      alt="loading"
                    />
                  ) : (
                    <img src={icon.send} alt="send" />
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handlePost}
              style={{ height: "70%" }}
              className={cx("form")}
            >
              <div className={cx("title")}>
                <input
                  value={title}
                  placeholder="Tên bài hát"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={cx("author")}>
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
                    <img src={icon.ok} style={{ filter: "none" }} alt="ok" />
                  ) : (
                    <img
                      src={icon.uploadMedia}
                      style={{ filter: "none" }}
                      alt="upload"
                    />
                  )}
                </label>
                <p>Thêm tệp âm thanh và ảnh</p>
              </div>
              <div className={cx("action")}>
                <button type="submit">
                  {loading ? (
                    <img
                      className={cx("loading")}
                      src={icon.loading}
                      alt="loading"
                    />
                  ) : (
                    <img src={icon.send} alt="send" />
                  )}
                </button>
              </div>
            </form>
          )}
          <div onClick={() => setSwap(!swap)} className={cx("swap")}>
            {!swap ? <p>Bạn cảm thấy lười và phức tạp?</p> : <p>Quay lại</p>}
          </div>
        </div>
      )}
      onClickOutside={() => setUpload(!upload)}
    >
      <div className={cx("upload")}>
        <button onClick={() => setUpload(!upload)}>
          <img src={icon.upload} alt="upload" />
        </button>
      </div>
    </Tippy>
  );
}

export default Upload;
