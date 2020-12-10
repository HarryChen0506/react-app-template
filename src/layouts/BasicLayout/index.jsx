import React from 'react';
import Authorized from '@/components/Authorized';
import './index.less';

const BasicLayout = (props) => {
  const { children, authority } = props;

  return (
    <div className="basic-layout">
      basic layout {JSON.stringify(authority)}
      <div className="main-container">
        <Authorized authority={authority}>
          {children}
        </Authorized>
        {/* {children} */}
      </div>
    </div>
  );
};

export default BasicLayout;
