/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import * as axios from 'axios';
import { compile } from 'path-to-regexp';
import Session from '@/services/session';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const addHeader = (headers = {}) => {
  const token = Session.getToken();
  return { ...headers, [Session.HEADER_TOKEN]: token };
};

const preprocess = (options = {}) => {
  const {
    url = '',
    method = 'get',
    data,
    params, // params用来填充url, 如pathToRegexp.compile('/user/:id')({id: 123})
    headers = {},
    ...restOptions
  } = options;
  let newUrl = url;
  try {
    let domain = '';
    if (newUrl.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domain] = newUrl.match(/[a-zA-z]+:\/\/[^/]*/);
      newUrl = url.slice(domain.length);
    }
    newUrl = compile(newUrl, { encode: encodeURIComponent })(params);
    newUrl = domain + newUrl;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
  const newHeaders = addHeader(headers);
  const newOptions = {
    ...restOptions,
    method,
    headers: newHeaders,
    data,
  };
  if (method === 'get') {
    newOptions.params = data;
    delete newOptions.data;
  }
  return {
    url: newUrl,
    ...newOptions,
  };
};

const request = (options = {}) => {
  const requestOptions = preprocess(options);
  return axios(requestOptions).then((res) => {
    // console.log(res);
    // 根据后端返回体类型，在此修改判断
    const data = res.data || {};
    data.httpCode = res.status;
    if (data.status === 200) {
      data.statusText = 'OK';
      return data;
    }
    if (data.status === 1001) {
      // history.replace({
      //   pathname: '/user/login',
      // });
      // eslint-disable-next-line no-console
      console.warn('token过期');
      return data;
    }
    return Promise.reject(data.msg || '失败');
  }).catch((error) => {
    const { response } = error;
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, data } = response;
      // eslint-disable-next-line no-console
      console.error(`请求错误 ${status}: ${data.path}`, errorText);
      // notification.error({
      //   message: ,
      //   description: errorText,
      // });
    } else if (!response) {
      // eslint-disable-next-line no-console
      console.error('您的网络发生异常，无法连接服务器');
      // notification.error({
      //   description: '',
      //   message: '网络异常',
      // });
    }
    throw error;
  });
};

export {
  request,
};
export default {
  request,
};
