import { LocalStorage } from '@/utils/util';
import {
  LOAD_SETTING_DATA,
  CLEAR_SETTING_DATA,
} from '../constants/setting';

const INITIAL_SETTING = {
  locale: LocalStorage.get('locale') || 'zh-CN',
  theme: 'light',
};

export default function setting(state = INITIAL_SETTING, action) {
  switch (action.type) {
    case LOAD_SETTING_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_SETTING_DATA:
      return {
        ...INITIAL_SETTING,
      };
    default:
      return state;
  }
}
