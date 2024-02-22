import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useAppContext } from "~/component/context/AppContext";
import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { logoutUser } from "~/redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "~/redux/authSlide";
import icon from "~/assets/icon";

const cx = classNames.bind(styles);

function Account() {
  const { createAxios } = useAppContext();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const assessToken = user?.accessToken;
  const id = user?._id;
  const [settingAcc, setSettingAcc] = useState(false);
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  const handleLogOut = () => {
    logoutUser(dispatch, id, assessToken, axiosJWT);
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
        <img
          onClick={() => setSettingAcc(!settingAcc)}
          src={user.avatar === null ? icon.avatar : user.avatar}
          alt=""
        />
      </div>
    </Tippy>
  );
}

export default Account;
