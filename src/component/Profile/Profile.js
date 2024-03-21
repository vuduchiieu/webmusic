import React, { useState } from "react";
import Modal from "react-modal";

import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "../context/AppContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "~/redux/authSlide";
import { jwtDecode } from "jwt-decode";

const cx = classNames.bind(styles);

function Profile({ isOpen, onClose }) {
  const { user, themeMode, closeModal } = useAppContext();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isForcus, setIsForcus] = useState(false);

  const dispatch = useDispatch();

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

    try {
      const res = await axios.put(
        `https://be-stave-6c9234b70089.herokuapp.com/v1/user/${user?._id}`,
        newUser
      );
      const decodedToken = jwtDecode(res.data);
      dispatch(loginSuccess(decodedToken));
      closeModal();
    } catch (error) {
      console.log(error);
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
            src={user?.avatar || icon.avatar}
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
            <label className={cx("changeAvt")} for="file-upload">
              <p>Chọn ảnh</p>
            </label>
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
