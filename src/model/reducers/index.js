import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import setting from './setting';

export default combineReducers({
  counter,
  user,
  setting,
});
