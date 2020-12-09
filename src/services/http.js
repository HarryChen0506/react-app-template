// http服务
import { request } from '@/utils/request';
import { path } from '@/config/api.config';

export const user = {
  login(data) {
    return request({
      url: path.user.login,
      method: 'post',
      data,
    });
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
