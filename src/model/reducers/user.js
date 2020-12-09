import {
  LOAD_USER_DATA,
  CLEAR_USER_DATA,
  LOAD_CURRENT_USER_DATA,
  CLEAR_CURRENT_USER_DATA,
} from '../constants/user';

const INITIAL_CURRENT_USER = {
  login: false,
  permissions: [],
  authority: [], // 当前用户的授权 ['admin', 'user']
  role: [],
  token: null,
  username: null,
  userId: null,
};

export const INITIAL_USER_STATE = {
  currentUser: { ...INITIAL_CURRENT_USER },
};

export default function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...INITIAL_USER_STATE,
      };
    case LOAD_CURRENT_USER_DATA:
      return {
        ...INITIAL_USER_STATE,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case CLEAR_CURRENT_USER_DATA:
      return {
        ...INITIAL_USER_STATE,
        currentUser: {
          ...INITIAL_USER_STATE.currentUser,
        },
      };
    default:
      return state;
  }
}
