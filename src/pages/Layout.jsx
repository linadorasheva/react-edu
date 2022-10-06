import React from 'react';
import { Outlet } from 'react-router-dom';

import MyNavigation from '../components/UI/navigation/MyNavigation.jsx';

const Layout = () => {
  return (
    <div>
      <MyNavigation />
      <Outlet />
    </div>
  );
};

export default Layout;
