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
  updateUserSuccess,
} from "./authSlide";
import Cookies from "js-cookie";

let token = null;
const storedToken = Cookies.get("token");
if (storedToken) {
  token = storedToken;
}
const loginUser = async (user, dispatch, setLogin, setRefreshData) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/v1/auth/login`,
      user
    );
    const decodedToken = jwtDecode(res.data);
    Cookies.set("token", res.data, { expires: 7 });
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
    Cookies.remove("token");
    dispatch(logoutSuccess());
    setAgain([]);
    setRecommend([]);
  } catch (error) {
    dispatch(logoutFailed());
  }
};

const updateUser = async (newUser, user, dispatch, closeModal) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/v1/user/${user?._id}`,
      newUser,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    const decodedToken = jwtDecode(res.data);
    dispatch(updateUserSuccess(decodedToken));
    closeModal();
  } catch (error) {
    console.log(error);
  }
};
export { loginUser, registerUser, logoutUser, updateUser };
