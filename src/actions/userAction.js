import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../constant/userConstant.js";
import axios from "axios";

export const login = (data, callback) => {
  const request = axios.post(
    `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_LOGIN}`,
    data
  );
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        callback(error);
      });
  };
};

export const register = (data, callback) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const registerURL = process.env.REACT_APP_REGISTRATION;

  const request = axios.post(baseURL + registerURL, data);
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        // apiErrors(error);
        callback(error);
      });
  };
};

export function getEmail(data, callback) {}
