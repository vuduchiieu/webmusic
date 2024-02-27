import axios from "axios";
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

const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://be-song-dbac8dd7b6a3.herokuapp.com/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    alert("Đăng nhập thất bại:");
    dispatch(loginFailed());
  }
};

const registerUser = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    await axios.post(
      "https://be-song-dbac8dd7b6a3.herokuapp.com/v1/auth/register",
      user
    );
    dispatch(registerSuccess());
  } catch (error) {
    alert("Đăng ký thất bại");
    dispatch(registerFailed());
  }
};

const logoutUser = async (dispatch, id, assessToken, axiosJWT, setAgain) => {
  dispatch(logoutStart());
  try {
    // await axiosJWT.post("https://be-song-dbac8dd7b6a3.herokuapp.com/v1/auth/logout", id, {
    //   header: { token: `Bearer ${assessToken}` },
    // });
    dispatch(logoutSuccess());
    setAgain([]);
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export { loginUser, registerUser, logoutUser };
