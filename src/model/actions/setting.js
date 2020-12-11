import { LocalStorage } from '@/utils/util';
import {
  LOAD_SETTING_DATA,
  CLEAR_SETTING_DATA,
} from '../constants/setting';

export const loadSettingData = (payload = {}) => ({
  type: LOAD_SETTING_DATA,
  payload,
});

export const clearSettingData = () => ({
  type: CLEAR_SETTING_DATA,
});

export const setLocale = lang => (dispatch) => {
  LocalStorage.save('locale', lang);
  dispatch(loadSettingData({
    locale: lang,
  }));
};
