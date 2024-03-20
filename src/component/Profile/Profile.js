import React from "react";
import Modal from "react-modal";

import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "../context/AppContext";

const cx = classNames.bind(styles);

function Profile({ isOpen, onClose }) {
  const { user, themeMode } = useAppContext();
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
          <img src={user?.avatar || icon.avatar} alt="avatar" />
        </div>
        <form className={cx("detail")}>
          <input type="text" defaultValue={user?.username} />
          <input type="email" defaultValue={user?.email} />
          <button>
            <p>Lưu</p>
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default Profile;
