import axios from 'axios';
import firebase from '../axios-firebase';

export const AUTH_START = 'auth_start';
export const AUTH_SUCCESS = 'auth_success';
export const AUTH_FAIL = 'auth_fail';
export const AUTH_LOGOUT = 'auth_logout';
export const AUTH_REDIRECT_PATH = 'auth_redirect_path';

export const ADD_FEATURE = 'add_feature';
export const REMOVE_FEATURE = 'remove_feature';
export const SET_FEATURES = 'set_features';
export const FETCH_FEATURES_FAIL = 'fetch_features_fail';

export const ORDER_INIT = 'order_init';
export const ORDER_PLACED = 'order_placed';
export const ORDER_SUCCESS = 'order_success';
export const ORDER_FAIL = 'order_fail';

export const FETCH_ORDERS_START = 'fetch_orders_start';
export const FETCH_ORDERS_SUCCESS = 'fetch_orders_success';
export const FETCH_ORDERS_FAIL = 'fetch_orders_fail';

export const auth = (email, password, registration) => dispatch => {
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCL9e6vTHXyd3icu4_sYcjrKum9Rrd5T64';

  if (!registration) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCL9e6vTHXyd3icu4_sYcjrKum9Rrd5T64';
  }

  const user = {
    email,
    password,
    returnSecureToken: true
  };

  dispatch(authStart());

  axios
    .post(url, user)
    .then(response => {
      // console.log(response);
      // create new date using the current date + expiration time in seconds
      const expiration = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('user', response.data.localId);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expiration', expiration);
      // localStorage.setItem('refreshToken', response.data.refreshToken);

      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(authTimeout(response.data.expiresIn));
    })
    .catch(error => {
      // console.log(error);
      dispatch(authFail(error.response.data.error));
    });
};

export const authStart = () => ({
  type: AUTH_START
});

export const authSuccess = (id, token) => ({
  type: AUTH_SUCCESS,
  id,
  token
});

export const authFail = error => ({
  type: AUTH_FAIL,
  error
});

export const authTimeout = expiration => dispatch => {
  setTimeout(() => {
    // convert expiration from seconds to milliseconds
    // expiration is 60 minutes
    dispatch(authLogout());
  }, expiration * 1000);
};

export const authLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  // localStorage.removeItem('refreshToken');

  return {
    type: AUTH_LOGOUT
  };
};

export const authRedirectPath = path => ({
  type: AUTH_REDIRECT_PATH,
  path
});

export const authState = () => dispatch => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authLogout());
  }

  // convert stored date STRING to a new Date object
  const expiration = new Date(localStorage.getItem('expiration'));

  // compare expiration to current time
  if (expiration <= new Date()) {
    dispatch(authLogout());
  } else {
    const user = localStorage.getItem('user');

    dispatch(authSuccess(token, user));
    dispatch(authTimeout((expiration.getTime() - new Date().getTime()) / 1000));
  }
};

export const initFeatures = () => dispatch => {
  firebase
    .get('/features.json')
    .then(response => dispatch(setFeatures(response.data)))
    .catch(error => dispatch(fetchFeaturesFail()));
};

export const setFeatures = features => ({
  type: SET_FEATURES,
  features
});

export const fetchFeaturesFail = () => ({
  type: FETCH_FEATURES_FAIL
});

export const addFeature = feature => ({
  type: ADD_FEATURE,
  feature
});

export const removeFeature = feature => ({
  type: REMOVE_FEATURE,
  feature
});

export const orderInit = () => ({
  type: ORDER_INIT
});

export const orderStart = (order, token) => dispatch => {
  dispatch(orderPlaced());

  firebase
    .post(`/orders.json?auth=${token}`, order)
    .then(response => dispatch(orderSuccess(response.data.name, order)))
    .catch(error => dispatch(orderFail(error)));
};

export const orderPlaced = () => ({
  type: ORDER_PLACED
});

export const orderSuccess = (name, order) => ({
  type: ORDER_SUCCESS,
  name,
  order
});

export const orderFail = error => ({
  type: ORDER_FAIL,
  error
});

export const fetchOrders = (token, id) => dispatch => {
  dispatch(fetchOrdersStart());

  firebase
    .get(`/orders.json?auth=${token}&orderBy="id"&equalTo="${id}"`)
    // .get(`/orders.json?auth=${token}`)
    .then(response => {
      const orders = [];

      // loop over response.data object and push values to orders array
      for (let key in response.data) {
        orders.push({ ...response.data[key], id: key });
      }

      dispatch(fetchOrdersSuccess(orders));
    })
    .catch(error => dispatch(fetchOrdersFail(error)));
};

export const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START
});

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: FETCH_ORDERS_FAIL,
  error
});
