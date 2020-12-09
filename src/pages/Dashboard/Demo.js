import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, minus, asyncAdd } from '@/model/actions/counter';
import { login, logout } from '@/model/actions/user';
import { user as userHttpService, core as coreHttpService } from '@/services/http';

const Demo = () => {
  const counter = useSelector(state => state.counter);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogin = () => {
    userHttpService.login().then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err.message);
    });
  };
  const handleQueryUser = () => {
    coreHttpService.demo({ userId: '123' }, { type: 'web' }).then((res) => {
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
    </>
  );
};

export default Demo;
