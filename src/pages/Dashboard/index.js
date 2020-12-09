import React from 'react';
import Demo from '@/components/Demo';
import { useSelector } from 'react-redux';
import Authorized from '@/components/Authorized';

const Dashboard = (props) => {
  const { authority } = props;
  const currentUser = useSelector(state => state.user.currentUser);
  return (
    <div className="page-dashboard">
      <h1>
        Dashboard Page {JSON.stringify(authority)}
      </h1>
      <div className="page-body">
        <Authorized authority={authority} currentAuthority={currentUser.authority}>
          <Demo />
        </Authorized>
      </div>
    </div>
  );
};

export default Dashboard;
