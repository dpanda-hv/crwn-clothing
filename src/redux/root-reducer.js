
import { combineReducers } from 'redux';

import directoryReducer from './directory/directory.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  directory: directoryReducer,
});

export default rootReducer;
