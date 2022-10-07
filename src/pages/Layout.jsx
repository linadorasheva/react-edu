import React from 'react';
import { Outlet } from 'react-router-dom';

import MyNavigation from '../components/UI/navigation/MyNavigation.jsx';

const Layout = () => {
  return (
    <div className='layout'>
      <header className='layout__header'>
        <MyNavigation />
      </header>
      
      <Outlet />
    </div>
  );
};

export default Layout;
