import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import icon from "~/assets/icon";
import { loginUser, registerUser } from "~/redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Login() {
  const { login, setLogin } = useAppContext();

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

  const firebaseConfig = {
    apiKey: "AIzaSyDX55f48sODJp0pIjEU7LCGtyvrtJJ0IRU",
    authDomain: "songs-cac58.firebaseapp.com",
    projectId: "songs-cac58",
    storageBucket: "songs-cac58.appspot.com",
    messagingSenderId: "401411539907",
    appId: "1:401411539907:web:066394cd9e7f744f75f376",
    measurementId: "G-14M9HZDFP9",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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
    loginUser(newUser, dispatch, setLogin);
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
      setPasswordError("password phải bao gồm 1 số và 1 chữ hoa");
      return;
    }
    await registerUser(newUser, dispatch);
    const registrationSuccessful = true;
    if (registrationSuccessful) {
      await handleLogin(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post(
        "https://be-song.vercel.app/v1/auth/google",
        {
          idToken: idToken,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
            <div className={cx("signUp")}>
              <h1>Đăng ký...</h1>
              <form onSubmit={handleRegister} className={cx("normally")}>
                <div className={cx("avatar")}>
                  <input id="avatar" type="file" />
                  <label htmlFor="avatar">
                    <img src={icon.uploadAvatar} alt="" />
                  </label>
                  <p>Một chiếc ảnh thật là xinh</p>
                </div>
                <div className={cx("email")}>
                  <p>Email</p>
                  <input
                    placeholder="Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className={cx("err")}>
                    <span>{emailError}</span>
                  </div>
                </div>
                <div className={cx("username")}>
                  <p>Tên người dùng</p>
                  <input
                    placeholder="Tên người dùng"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className={cx("err")}>
                    <span>{usernameError}</span>
                  </div>
                </div>
                <div className={cx("password")}>
                  <p>Mật khẩu</p>
                  <input
                    placeholder="Mật khẩu"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className={cx("err")}>
                    <span>{passwordError}</span>
                  </div>
                </div>
                <div className={cx("action")}>
                  <button type="submit">
                    {loadingRegister ? (
                      <img src={icon.loading} alt="" />
                    ) : (
                      <p>Đăng ký</p>
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
              <h1>Đăng nhập vào.....</h1>
              <div className={cx("social")}>
                <div onClick={handleGoogleLogin} className={cx("loginGG")}>
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
              <form onSubmit={handleLogin} className={cx("normally")}>
                <div className={cx("email")}>
                  <p>Email hoặc tên người dùng</p>
                  <input
                    placeholder="email hoặc tên người dùng"
                    type="text"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className={cx("password")}>
                  <p>Mật khẩu</p>
                  <input
                    placeholder="Mật khẩu"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={cx("action")}>
                  <button type="submit">
                    {loading ? (
                      <img src={icon.loading} alt="" />
                    ) : (
                      <p>Đăng nhập</p>
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
            alt=""
          />
        </button>
      </div>
    </Tippy>
  );
}

export default Login;
