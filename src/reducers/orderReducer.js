import * as actions from '../actions';

const initialState = {
  loading: false,
  orders: [],
  ordered: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_INIT:
      return {
        ...state,
        ordered: false
      };
    case actions.ORDER_PLACED:
      return {
        ...state,
        loading: true
      };
    case actions.ORDER_SUCCESS:
      const newOrder = {
        ...action.order,
        name: action.name
      };
      return {
        ...state,
        loading: false,
        ordered: true,
        orders: state.orders.concat(newOrder)
      };
    case actions.ORDER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actions.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };
    case actions.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default orderReducer;
