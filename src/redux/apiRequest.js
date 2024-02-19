import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlide";

const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://be-song.vercel.app/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    dispatch(loginFailed());
  }
};

const registerUser = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    await axios.post("https://be-song.vercel.app/v1/auth/register", user);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(registerFailed());
  }
};

const logoutUser = async (dispatch, id, assessToken, axiosJWT) => {
  dispatch(loginStart());
  try {
    await axiosJWT.post("https://be-song.vercel.app/v1/auth/logout", id, {
      header: { token: `Bearer ${assessToken}` },
    });
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailed());
  }
};

export { loginUser, registerUser, logoutUser };