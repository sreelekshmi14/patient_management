import React from 'react';
import Sidebar from './sidebar';

import ProfileView from './profile';

const DashboardMain = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'scroll initial',
      }}
    >
      <Sidebar />
      <div style={{ width: '80%', marginLeft: '30%' }}>
        <ProfileView />
      </div>
    </div>
  );
};

export default DashboardMain;
