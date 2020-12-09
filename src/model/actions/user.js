/* eslint-disable */
import {
  LOAD_USER_DATA, CLEAR_USER_DATA, LOAD_CURRENT_USER_DATA, CLEAR_CURRENT_USER_DATA,
} from '../constants/user';
// import { user as userHttpService } from '@services/http';
// import Session from '@services/session';

export const loadUserData = (payload = {}) => ({
  type: LOAD_USER_DATA,
  payload,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const loadCurrentUserData = (payload = {}) => ({
  type: LOAD_CURRENT_USER_DATA,
  payload,
});

export const clearCurrentUserData = () => ({
  type: CLEAR_CURRENT_USER_DATA,
});

// 登录
export function login(data, sucNext, failNext) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(loadCurrentUserData({ username: 'harry', authority: ['user'] }));
    }, 500);
    // userHttpService.login(data).then((res) => {
    //   const { token, ...rest } = res.body || {};
    //   const userInfo = { login: true, token, ...rest };
    //   dispatch(loadUserData(userInfo));
    //   Session.saveSession(token);
    //   typeof sucNext === 'function' && sucNext(res);
    // }).catch((err) => {
    //   typeof failNext === 'function' && failNext(err);
    // });
  };
}

// 验证用户
export function queryUser(data, sucNext, failNext) {
  return (dispatch) => {
    // userHttpService.queryCurrent(data).then((res) => {
    //   const { token, ...rest } = res.body || {};
    //   const userInfo = { login: true, token, ...rest };
    //   dispatch(loadUserData(userInfo));
    //   Session.saveSession(token);
    //   typeof sucNext === 'function' && sucNext(res);
    // }).catch((err) => {
    //   typeof failNext === 'function' && failNext(err);
    // });
  };
}

// 注销
export function logout(data, sucNext, failNext) {
  return (dispatch) => {
    dispatch(clearCurrentUserData());
    // userHttpService.logout(data).then((res) => {
    //   dispatch(clearUserData());
    //   Session.clearSession();
    //   typeof sucNext === 'function' && sucNext(res);
    // }).catch((err) => {
    //   typeof failNext === 'function' && failNext(err);
    // });
  };
}
