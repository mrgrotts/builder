import * as actions from '../actions';

const FEATURE_PRICES = {
  one: 40.0,
  two: 40.0,
  three: 50.0,
  four: 30.0,
  five: 25.0
};

const initialState = {
  building: false,
  features: null,
  total: 50,
  error: false
};

const builderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_FEATURES:
      return {
        ...state,
        building: false,
        features: {
          one: action.features.one,
          two: action.features.two,
          three: action.features.three,
          four: action.features.four,
          five: action.features.five
        },
        total: 50,
        error: false
      };
    case actions.FETCH_FEATURES_FAIL:
      return {
        ...state,
        error: true
      };
    case actions.ADD_FEATURE:
      return {
        ...state,
        building: true,
        features: {
          ...state.features,
          [action.feature]: state.features[action.feature] + 1
        },
        total: state.total + FEATURE_PRICES[action.feature]
      };
    case actions.REMOVE_FEATURE:
      return {
        ...state,
        building: true,
        features: {
          ...state.features,
          [action.feature]: state.features[action.feature] - 1
        },
        total: state.total - FEATURE_PRICES[action.feature]
      };
    default:
      return state;
  }
};

export default builderReducer;
