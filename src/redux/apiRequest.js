import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlide";

let token = null;

const loginUser = async (user, dispatch, setLogin, setRefreshData) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/v1/auth/login`,
      user
    );
    const decodedToken = jwtDecode(res.data);
    token = res.data;
    dispatch(loginSuccess(decodedToken));
    setLogin(false);
    setRefreshData(true);
  } catch (error) {
    alert("Đăng nhập thất bại:");
    dispatch(loginFailed());
  }
};

const registerUser = async (user, dispatch, setRefreshData) => {
  dispatch(registerStart());
  try {
    await axios.post(`${process.env.REACT_APP_API}/v1/auth/register`, user);
    dispatch(registerSuccess());
    setRefreshData(true);
  } catch (error) {
    alert("Đăng ký thất bại");
    dispatch(registerFailed());
  }
};

const logoutUser = async (dispatch, setAgain, setRecommend) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    setAgain([]);
    setRecommend([]);
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export { loginUser, registerUser, logoutUser, token };
