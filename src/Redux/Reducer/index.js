import {combineReducers} from 'redux';
import Auth from './Auth';
import List from './List';
import Coupon from './Coupon';
export default combineReducers({
  Auth,
  List,
  Coupon,
});
