import Axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_ERROR,
} from "./types";

export const SignUp = data => {
  return async dispatch => {
    try {
      const res = await Axios.post('http://localhost:5000/signup', data)
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
        payload_role: res.data.role,
        payload_userName: data.userName
      });
      localStorage.setItem('zeBilet', res.data.token)
      localStorage.setItem('pRemisiuni', JSON.stringify(res.data.role))
      localStorage.setItem('uNema', data.userName)
    } catch (error) {
      if (error.response.status === 400) {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.details[0].message
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data
        });
      }
    }
  };
}

export const SignIn = data => {
  return async dispatch => {
    try {
      const res = await Axios.post('http://localhost:5000/signin', data)
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
        payload_role: res.data.role,
        payload_userName: data.userName
      });
      localStorage.setItem('zeBilet', res.data.token)
      localStorage.setItem('pRemisiuni', JSON.stringify(res.data.role))
      localStorage.setItem('uNema', data.userName)
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.details[0].message
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data
        });
      }
    }
  };
}

export const SignOut = () => {
  return async dispatch => {

    localStorage.removeItem('zeBilet');
    localStorage.removeItem('pRemisiuni');
    localStorage.removeItem('uNema');

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: '',
      payload_role: [],
      payload_userName: ""
    });
  };
}
