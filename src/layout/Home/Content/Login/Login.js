import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import icon from "~/assets/icon";
import { loginUser, registerUser } from "~/redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Login() {
  const { login, setLogin, setRefreshData } = useAppContext();

  const loading = useSelector((state) => state.auth.login.isFetching);
  const loadingRegister = useSelector(
    (state) => state.auth.register.isFetching
  );

  const [signUp, setSignUp] = useState(false);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const newUser = {
    email: email,
    password: password,
    username: username,
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username) => {
    return username.length >= 5;
  };

  const isValidPassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    return uppercaseRegex.test(password) && digitRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(newUser, dispatch, setLogin, setRefreshData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("email không hợp lệ");
      return;
    }
    if (!isValidUsername(username)) {
      setUsernameError("username tối thiếu 5 ký tự ");
      return;
    }
    if (!isValidPassword(password)) {
      setPasswordError("password gồm số và chữ hoa");
      return;
    }
    await registerUser(newUser, dispatch, setRefreshData);
    const registrationSuccessful = true;
    if (registrationSuccessful) {
      await handleLogin(e);
    }
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={login}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("login-model")}>
          {signUp ? (
            <div className={cx("register")}>
              <h2>Đăng ký</h2>
              <form onSubmit={handleRegister} className={cx("form")}>
                <div className={cx("normally")}>
                  <div className={cx("email")}>
                    <input
                      placeholder="Email"
                      type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <div className={cx("err")}>
                      <span>{emailError}</span>
                    </div>
                  </div>
                  <div className={cx("username")}>
                    <input
                      placeholder="Tên người dùng"
                      type="text"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <div className={cx("err")}>
                      <span>{usernameError}</span>
                    </div>
                  </div>
                  <div className={cx("password")}>
                    <input
                      placeholder="Mật khẩu"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={cx("err")}>
                      <span>{passwordError}</span>
                    </div>
                  </div>
                </div>
                <div className={cx("action")}>
                  <button type="submit">
                    {loadingRegister ? (
                      <img
                        className={cx("loading")}
                        src={icon.loading}
                        alt="loading"
                      />
                    ) : (
                      <img
                        className={cx("next")}
                        src={icon.arrowNext}
                        alt="next"
                      />
                    )}
                  </button>
                </div>
              </form>
              <div className={cx("forward")}>
                <p>
                  Bạn đã có tài khoản?
                  <span onClick={() => setSignUp(!signUp)}>Đăng nhập ngay</span>
                </p>
              </div>
            </div>
          ) : (
            <div className={cx("sign-in")}>
              <h2>Đăng nhập</h2>
              <form onSubmit={handleLogin} className={cx("form")}>
                <div className={cx("normally")}>
                  <div className={cx("email")}>
                    <input
                      placeholder="Email hoặc tên người dùng"
                      type="text"
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className={cx("password")}>
                    <input
                      placeholder="Mật khẩu"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className={cx("social")}>
                    <img src={icon.google} alt="google" />
                    <img src={icon.facebook} alt="facebook" />
                  </div>
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
                      <img
                        className={cx("next")}
                        src={icon.arrowNext}
                        alt="next"
                      />
                    )}
                  </button>
                </div>
              </form>
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
          <img
            style={{ width: "100%", height: "100%" }}
            src={icon.login}
            alt="login"
          />
        </button>
      </div>
    </Tippy>
  );
}

export default Login;
