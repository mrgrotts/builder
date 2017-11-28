import * as actions from '../../actions';

import { updateObject } from '../../utils/utils';

const initialState = {
  loading: false,
  orders: [],
  ordered: false
};

const orderInit = (state, action) => {
  return updateObject(state, { ordered: false });
};

const orderPlaced = (state, action) => {
  return updateObject(state, { loading: true });
};

const orderSuccess = (state, action) => {
  const newOrder = updateObject(action.order, {
    id: action.orderId
  });

  return updateObject(state, {
    loading: false,
    ordered: true,
    orders: state.orders.concat(newOrder)
  });
};

const orderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_INIT:
      return orderInit(state, action);
    case actions.ORDER_PLACED:
      return orderPlaced(state, action);
    case actions.ORDER_SUCCESS:
      return orderSuccess(state, action);
    case actions.ORDER_FAIL:
      return orderFail(state, action);
    case actions.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actions.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actions.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default orderReducer;
