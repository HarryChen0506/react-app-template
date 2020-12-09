import React, { useEffect } from 'react';
// import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/model/actions/user';
import Authorized from '@/components/Authorized';
import './index.less';

const BasicLayout = (props) => {
  const { children, authority } = props;
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <div className="basic-layout">
      basic layout {JSON.stringify(authority)}
      <div className="main-container">
        <Authorized authority={authority} currentAuthority={currentUser.authority}>
          {children}
        </Authorized>
        {/* {children} */}
      </div>
    </div>
  );
};

export default BasicLayout;
