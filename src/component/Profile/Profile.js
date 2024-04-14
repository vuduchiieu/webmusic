import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "../context/AppContext";
import { useDispatch } from "react-redux";
import { updateUser } from "~/redux/apiRequest";

const cx = classNames.bind(styles);

function Profile({ isOpen, onClose }) {
  const { user, themeMode, closeModal } = useAppContext();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isForcus, setIsForcus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (avatar) {
      const imageURL = URL.createObjectURL(avatar);
      setAvatarPreview(imageURL);
    }
  }, [avatar]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const newUser = new FormData();
    if (email) {
      newUser.append("email", email);
    }
    if (username) {
      newUser.append("username", username);
    }
    if (avatar) {
      newUser.append("file", avatar);
    }
    await updateUser(newUser, user, dispatch, closeModal);
  };
  const handleRemoveAvatar = () => {
    if (avatarPreview) {
      setAvatarPreview(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className={cx("profile-model", { dark: themeMode })}
    >
      <div className={cx("header")}>
        <h2>Chi tiết hồ sơ</h2>
        <img src={icon.close} alt="close" onClick={onClose} />
      </div>
      <div className={cx("profile")}>
        <div className={cx("avatar")}>
          <img
            onMouseEnter={() => setIsForcus(true)}
            onMouseLeave={() => {
              if (isForcus === true) {
                setTimeout(() => {
                  setIsForcus(false);
                }, 5000);
              }
            }}
            src={avatarPreview || user?.avatar || icon.avatar}
            alt="avatar"
            className={isForcus ? cx("avatar-hover") : ""}
          />
        </div>
        <form onSubmit={handleUpdateUser} className={cx("detail")}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            defaultValue={user?.username}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            defaultValue={user?.email}
          />
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          {isForcus && (
            <div className={cx("action")}>
              <label className={cx("select")} htmlFor="file-upload">
                <img src={icon.camera} alt="camera" />
              </label>
              {avatarPreview && (
                <div className={cx("delete")} onClick={handleRemoveAvatar}>
                  <img src={icon.delete} alt="delete" />
                </div>
              )}
            </div>
          )}

          <button type="submit">
            <p>Lưu</p>
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default Profile;
