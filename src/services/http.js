// http服务
import { request } from '@/utils/request';
import { path } from '@/config/api.config';

const mockRequest = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      msg: 'success',
      data: {
        username: 'abc',
        token: 'token_123456',
        userId: '123abc',
      },
    });
  }, 200);
});

export const user = {
  login(data) {
    // return request({
    //   url: path.user.login,
    //   method: 'post',
    //   data,
    // });
    return mockRequest();
  },
  logout(data) {
    // return request({
    //   url: path.user.logout,
    //   method: 'post',
    //   data,
    // });
    return mockRequest();
  },
  currentUser(data) {
    // return request({
    //   url: path.user.currentUser,
    //   method: 'get',
    //   data,
    // });
    return mockRequest();
  },
};

export const core = {
  demo(params, data) {
    return request({
      url: path.core.demo,
      method: 'get',
      params,
      data,
    });
  },
};

export const common = {
};

export default {
  user,
  core,
  common,
};
