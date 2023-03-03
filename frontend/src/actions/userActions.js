import axios from 'axios';
import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAILURE,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from '../constants/userConstants';

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post('/api/users/register', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/api/users/signin', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  try {
    const {
      userSignin: { userInfo }
    } = getState();
    const { data } = await axios.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};
