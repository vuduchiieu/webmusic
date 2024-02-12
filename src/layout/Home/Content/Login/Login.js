import React, { useState } from "react";

import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { auth, provider } from "./LoginGG/config";
import { signInWithPopup } from "firebase/auth";
import icon from "~/assets/icon";
import { useAppContext } from "~/component/context/AppContext";
const cx = classNames.bind(styles);

function Login() {
  const { setAvatart } = useAppContext();

  const [login, setLogin] = useState(false);

  const handleLoginGG = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const { displayName, email, photoURL } = data.user;
        setAvatart(photoURL);
        localStorage.setItem("displayName", displayName);
        localStorage.setItem("email", email);
        localStorage.setItem("photoURL", photoURL);
      })
      .catch((error) => {
        console.error("Đăng nhập không thành công:", error.message);

        alert("Đăng nhập không thành công. Vui lòng thử lại.");
      });
  };

  const [signUp, setSignUp] = useState(false);

  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={login}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("login-model")}>
          {signUp ? (
            <div className={cx("signUp")}>
              <h1>Đăng ký...</h1>
              <div className={cx("normally")}>
                <h1>CHƯA LÀM CÁI NÀY!!!!!!</h1>
              </div>
              <div className={cx("forward")}>
                <p>
                  Bạn đã có tài khoản?
                  <span onClick={() => setSignUp(!signUp)}>Đăng nhập ngay</span>
                </p>
              </div>
            </div>
          ) : (
            <div className={cx("sign-in")}>
              <h1>Đăng nhập vào.....</h1>
              <div className={cx("social")}>
                <div onClick={handleLoginGG} className={cx("loginGG")}>
                  <button>
                    <img src={icon.google} alt="" />
                    <p>Tiếp tục bằng Google</p>
                  </button>
                </div>
                <div className={cx("loginFB")}>
                  <button>
                    <img src={icon.facebook} alt="" />
                    <p>Tiếp tục bằng Facebook</p>
                  </button>
                </div>
              </div>
              <div className={cx("normally")}>
                <div className={cx("email")}>
                  <p>Email hoặc tên người dùng</p>
                  <input placeholder="email hoặc tên người dùng" type="email" />
                </div>
                <div className={cx("password")}>
                  <p>Mật khẩu</p>
                  <input placeholder="Mật khẩu" type="password" />
                </div>
                <div className={cx("action")}>
                  <button>
                    <p>Đặng nhập</p>
                  </button>
                  <button>
                    <p>Quên mật khẩu</p>
                  </button>
                </div>
              </div>
              <div className={cx("forward")}>
                <p>
                  Bạn chưa có tài khoản?
                  <span onClick={() => setSignUp(!signUp)}>Đăng ký ngay</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      onClickOutside={() => setLogin(!login)}
    >
      <div className={cx("login")}>
        <button onClick={() => setLogin(!login)}>
          <p>Đăng nhập</p>
        </button>
      </div>
    </Tippy>
  );
}

export default Login;
