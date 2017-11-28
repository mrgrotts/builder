import { combineReducers } from 'redux';

import builderReducer from './builderReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

export default combineReducers({
  builder: builderReducer,
  order: orderReducer,
  auth: authReducer
});

// import builderReducerwUtil from './extra/builderReducerwUtil';
// import orderReducerwUtil from './extra/orderReducerwUtil';
// import authReducerwUtil from './extra/authReducerwUtil';

// export default combineReducers({
//   builder: builderReducerwUtil,
//   order: orderReducerwUtil,
//   auth: authReducerwUtil
// });
