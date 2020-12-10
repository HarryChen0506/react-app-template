import { user as userHttpService } from '@/services/http';
import Session from '@/services/session';
import {
  LOAD_USER_DATA, CLEAR_USER_DATA, LOAD_CURRENT_USER_DATA, CLEAR_CURRENT_USER_DATA,
} from '../constants/user';

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
    userHttpService.login(data).then((res) => {
      const { token, ...rest } = res.data || {};
      const userInfo = {
        login: true, token, authority: ['user'], ...rest,
      };
      dispatch(loadCurrentUserData(userInfo));
      Session.saveSession(token);
      typeof sucNext === 'function' && sucNext(res);
    }).catch((err) => {
      typeof failNext === 'function' && failNext(err);
    });
  };
}

// 验证用户
export function queryCurrentUser(data, sucNext, failNext) {
  return (dispatch) => {
    userHttpService.currentUser(data).then((res) => {
      // console.log('action queryCurrentUser', data, res);
      const { token, ...rest } = res.data || {};
      const userInfo = {
        login: true, token, authority: ['user'], ...rest,
      };
      dispatch(loadCurrentUserData(userInfo));
      Session.saveSession(token);
      typeof sucNext === 'function' && sucNext(res);
    }).catch((err) => {
      typeof failNext === 'function' && failNext(err);
    });
  };
}

// 注销
export function logout(data, sucNext, failNext) {
  return (dispatch) => {
    userHttpService.logout(data).then((res) => {
      dispatch(clearUserData());
      Session.clearSession();
      typeof sucNext === 'function' && sucNext(res);
    }).catch((err) => {
      typeof failNext === 'function' && failNext(err);
    });
  };
}
