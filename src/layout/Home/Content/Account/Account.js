import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useAppContext } from "~/component/context/AppContext";
import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "../Login/LoginGG/config";

const cx = classNames.bind(styles);

function Account() {
  const { avatar, setAvatart } = useAppContext();
  const [settingAcc, setSettingAcc] = useState(false);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
    setAvatart(null);
    localStorage.removeItem("photoURL");
  };
  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={settingAcc}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("setting")}>
          <button>
            <p>Hồ sơ</p>
          </button>
          <button>
            <p>Cài đặt</p>
          </button>
          <button onClick={handleLogOut}>
            <p>Đăng xuất</p>
          </button>
        </div>
      )}
      onClickOutside={() => setSettingAcc(!settingAcc)}
    >
      <div className={cx("login")}>
        <img onClick={() => setSettingAcc(!settingAcc)} src={avatar} alt="" />
      </div>
    </Tippy>
  );
}

export default Account;