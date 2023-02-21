import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAILURE,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS
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

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: ORDER_PAY_FAILURE, payload: message });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });

  const {
    userSignin: { userInfo }
  } = getState();

  try {
    const { data } = await axios.get('/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAILURE, payload: message });
  }
};
