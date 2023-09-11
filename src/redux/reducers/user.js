import axios from "axios";
import { API_URL } from "../../config";

const SIGN_UP = "SIGN_UP";
const ERROR = "ERROR";
const LOGIN = "LOGIN";
const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
const PASSWORD_RESET = 'PASSWORD_RESET';
const USER_DATA = 'USER_DATA';

const initialState = {
  
};

const authToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

const axiosAppConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': authToken,
  },
};

export const signUp = (username, email, password) => async (dispatch) => {
  const data = {
    user: {
        username,
        email,
        password,
    }
  };

  try {
    const response = await axios.post(`${API_URL}/signup`, data, axiosAppConfig);
    dispatch({
      type: SIGN_UP,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      error: error.response.data.status.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const data = {
    user: {
      email,
      password,
    }
  }
  try {
    const response = await axios.post(`${API_URL}/login`, data, axiosAppConfig);
    dispatch({
      type: LOGIN,
      payload: {
        token: response.headers.authorization,
        user: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      error: error.response.data.error,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  const data = {
    email,
  };

  await axios.post(`${API_URL}/password/forgot`, JSON.stringify(data), axiosAppConfig)
    .then((res) => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: res.data,
        error: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: err,
      });
    });
};

export const passwordReset = (newPassword, resetToken) => async (dispatch) => {
  const data = {
    new_password: newPassword,
    reset_token: resetToken,
  };

  const response = await axios.patch(`${API_URL}/password`, JSON.stringify(data), axiosAppConfig)
    .then((res) => res.data);
  dispatch({
    type: PASSWORD_RESET,
    payload: response,
  });
};

export const getUserData = (token) => async (dispatch) => {
  const response = await axios.get(`${API_URL}/api/v1/users/current_user_data`, { headers: { Authorization: token } })
  dispatch({
    type: USER_DATA,
    payload: response.data,
  })
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

      case LOGIN:
        return {
          ...action.payload,
        };

      case USER_DATA:
        return {
          ...action.payload
        };

    case ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
