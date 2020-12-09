// session管理
import { LocalStorage } from '@/utils/util';

const TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';
const HEADER_TOKEN = 'Token';
const Session = {
  TOKEN,
  REFRESH_TOKEN,
  HEADER_TOKEN,
  saveToken(type, data) {
    let key = TOKEN;
    if (type === REFRESH_TOKEN) {
      key = REFRESH_TOKEN;
    }
    LocalStorage.save(key, data);
  },
  getToken(type) {
    let key = TOKEN;
    if (type === REFRESH_TOKEN) {
      key = REFRESH_TOKEN;
    }
    LocalStorage.get(key);
    const res = LocalStorage.get(key);
    return res === null ? '' : res;
  },
  removeToken(type) {
    let key = TOKEN;
    if (type === REFRESH_TOKEN) {
      key = REFRESH_TOKEN;
    }
    LocalStorage.remove(key);
  },
  saveSession(token, refreshToken) {
    if (token) {
      this.saveToken(this.TOKEN, token);
    }
    if (refreshToken) {
      this.saveToken(this.REFRESH_TOKEN, refreshToken);
    }
  },
  clearSession() {
    this.removeToken(this.TOKEN);
    this.removeToken(this.REFRESH_TOKEN);
  },
  async continueSession() {
    // try {
    //   const refreshToken = this.getToken(Session.REFRESH_TOKEN)
    //   const res = await user.refreshToken({
    //     refreshToken: refreshToken
    //   })
    //   const data = (res.result && res.result.data) || {}
    //   this.saveSession(data.token, data.refreshToken)
    //   console.log('refreshToken res', res)
    //   return {
    //     token: data.token,
    //     refreshToken: data.refreshToken
    //   }
    // } catch (err) {
    //   console.log('refreshToken fail!', err)
    //   return {}
    // }
  },
};

export default Session;
