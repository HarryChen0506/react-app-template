import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, logout } from '@/model/actions/user';
// import { user as userHttpService } from '@/services/http';

const Login = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = useCallback(() => {
  //   console.log(name, password);
  // }, [name, password]);

  const handleLogin = () => {
    dispatch(login({ name, password }, (res) => {
      console.log('登录成功', res);
      history.push('/dashboard');
    }));
  };

  return (
    <div className="page-dashboard">
      <h1>
        Login Page
      </h1>
      <div className="page-body">
        <div>{JSON.stringify(currentUser)}</div>
        <form action="demo-form.php">
          name: <input type="text" value={name} onChange={e => setName(e.target.value)} /><br />
          password: <input type="text" value={password} onChange={e => setPassword(e.target.value)} /><br />
          <button type="button" onClick={handleLogin}>登录</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
