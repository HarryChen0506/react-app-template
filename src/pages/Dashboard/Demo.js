import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, minus, asyncAdd } from '@/model/actions/counter';
import { login, logout } from '@/model/actions/user';
import { setLocale } from '@/model/actions/setting';
import { user as userHttpService, core as coreHttpService } from '@/services/http';
import { useIntl } from 'react-intl';

const Demo = () => {
  const counter = useSelector(state => state.counter);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const intl = useIntl();
  const handleLogin = () => {
    userHttpService.login().then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err.message);
    });
  };
  const handleQueryUser = () => {
    coreHttpService.demo({ id: '123' }, { type: 'web' }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err.message);
    });
  };
  return (
    <>
      <h2>demo</h2>
      <h5>num: {counter.num}</h5>
      <div>
        <button type="button" onClick={() => dispatch(add())}> add</button>
        <button type="button" onClick={() => dispatch(minus())}> decrease</button>
        <button type="button" onClick={() => dispatch(asyncAdd())}> async add</button>
      </div>
      <h5>user: {currentUser.username}</h5>
      <div>
        <button type="button" onClick={() => dispatch(login())}> login</button>
        <button type="button" onClick={() => dispatch(logout())}> logout</button>
      </div>
      <h5>请求测试</h5>
      <div>
        <button type="button" onClick={handleLogin}>请求</button>
        <button type="button" onClick={handleQueryUser}>拼接参数</button>
      </div>
      <h5>国际化</h5>
      <div>
        <p>{intl.formatMessage({ id: 'navBar.lang' })}</p>
        <p>{intl.formatDate(new Date())}</p>
      </div>
      <div>
        <button type="button" onClick={() => { dispatch(setLocale('zh-CN')); }}>中文</button>
        <button type="button" onClick={() => { dispatch(setLocale('en-US')); }}>英文</button>
      </div>
    </>
  );
};

export default Demo;
