import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { logoutUser } from "~/redux/apiRequest";
import { useDispatch } from "react-redux";
import icon from "~/assets/icon";
import { loginSuccess } from "~/redux/authSlide";
import { useAppContext } from "~/component/context/AppContext";
import ListLibrary from "../../Navbar/ListLibrary/ListLibrary";

const cx = classNames.bind(styles);

function Account() {
  const { setAgain, user, setRecommend, openModal, isMobile } = useAppContext();
  const [settingAcc, setSettingAcc] = useState(false);
  const dispatch = useDispatch();
  const assessToken = user?.accessToken;
  const id = user?._id;

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "https://be-song.vercel.app/v1/auth/refresh",
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  let axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decoedToken = jwtDecode(user?.accessToken);
      if (decoedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleLogOut = () => {
    logoutUser(dispatch, id, assessToken, axiosJWT, setAgain, setRecommend);
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={settingAcc}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("setting")}>
          <button
            className={cx("profile")}
            onClick={() => {
              openModal();
              setSettingAcc(false);
            }}
          >
            <img
              src={user.avatar === null ? icon.avatar : user.avatar}
              alt=""
            />
            <p>{user.username}</p>
          </button>
          {isMobile ? (
            <ListLibrary />
          ) : (
            <button>
              <p>Cài đặt</p>
            </button>
          )}
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
