import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Loading register user
export const loadUser = () => async (dispatch) => {
  console.log('In here');
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Registering the user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// User Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.message, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logut // clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
