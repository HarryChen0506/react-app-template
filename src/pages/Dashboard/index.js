import React from 'react';
import Authorized from '@/components/Authorized';
import Demo from './Demo';

const Dashboard = (props) => {
  const { authority } = props;
  return (
    <div className="page-dashboard">
      <h1>
        Dashboard Page {JSON.stringify(authority)}
      </h1>
      <div className="page-body">
        <Authorized authority={authority} needCheckLoginValid={false}>
          <Demo />
        </Authorized>
      </div>
    </div>
  );
};

export default Dashboard;
