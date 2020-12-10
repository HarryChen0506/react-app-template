import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { queryCurrentUser } from '@/model/actions/user';
import Session from '@/services/session';

const Result = () => <div>你没有权限...</div>;

function checkValid(list = [], target = []) {
  let flag = false;
  if (list.length === 0) {
    return true;
  }
  list.forEach((v) => {
    if (target.includes(v)) {
      flag = true;
    }
  });
  return flag;
}

function check(authority, currentAuthority, target, Exception) {
  // console.log('check', authority, currentAuthority, checkValid(authority, currentAuthority));
  const isValid = checkValid(authority, currentAuthority);
  if (isValid) {
    return target;
  }
  return Exception;
}

const Authorized = ({
  children,
  authority,
  needCheckLoginValid = true, // 是否需要检查用户账号登录有效，有些页面可以设置不做检查，只做路由权限校验
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  ),
}) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const currentAuthority = currentUser.authority;
  const dispatch = useDispatch();
  const [hasToken, setHasToken] = useState(true);
  const [toLogin, setToLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (needCheckLoginValid === false) {
      return;
    }
    const token = Session.getToken();
    if (!token) {
      setHasToken(false);
      return;
    }
    if (!currentUser.login) {
      dispatch(queryCurrentUser(null, (res) => {
        // eslint-disable-next-line no-console
        console.warn('自动登录成功', res);
        // const { roleInfo: { roleCode } } = this.props.user;
        // const { location: { pathname } } = this.props.history;
        // if (pathname === ROUTE.TEMPLATE_MANAGE && roleCode !== '3') {
        //   history.push(ROUTE.STUDY_LIST);
        // }
      }, (err) => {
        // eslint-disable-next-line no-console
        console.error('Authorized: queryCurrentUser', err);
        setToLogin(true);
      }));
    }
  }, [needCheckLoginValid, currentUser.login, dispatch]);

  if (!hasToken || toLogin) {
    setTimeout(() => {
      history.push('/login');
    }, 50);
    return null;
  }

  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, currentAuthority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
