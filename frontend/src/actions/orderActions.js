import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from '../constants/orderConstants';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo }
    } = getState();
    const { data } = await axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    // After placing the order clear the cart items from store and localStorage
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo }
  } = getState();
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message
    });
  }
};
