import * as actions from '../../actions';

import { updateObject } from '../../utils/utils';

const FEATURE_PRICES = {
  one: 40.0,
  two: 40.0,
  three: 50.0,
  four: 30.0,
  five: 25.0
};

const initialState = {
  features: null,
  total: 50,
  error: false
};

const setFeatures = (state, action) => {
  return updateObject(state, {
    features: {
      one: action.features.one,
      two: action.features.two,
      three: action.features.three,
      four: action.features.four,
      five: action.features.five
    },
    total: 50,
    error: false
  });
};

const addFeature = (state, action) => {
  const updatedFeature = {
    [action.feature]: state.features[action.feature] + 1
  };
  const updatedFeatures = updateObject(state.features, updatedFeature);
  const updatedState = {
    features: updatedFeatures,
    total: state.total + FEATURE_PRICES[action.feature]
  };
  return updateObject(state, updatedState);
};

const removeFeature = (state, action) => {
  const updatedFeature = {
    [action.feature]: state.features[action.feature] - 1
  };
  const updatedFeatures = updateObject(state.features, updatedFeature);
  const updatedState = {
    features: updatedFeatures,
    total: state.total + FEATURE_PRICES[action.feature]
  };
  return updateObject(state, updatedState);
};

const builderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_FEATURES:
      return setFeatures(state, action);
    case actions.FETCH_FEATURES_FAIL:
      return updateObject(state, { error: true });
    case actions.ADD_FEATURE:
      return addFeature(state, action);
    case actions.REMOVE_FEATURE:
      return removeFeature(state, action);
    default:
      return state;
  }
};

export default builderReducer;
