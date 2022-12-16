import React from 'react';
import { Outlet } from 'react-router-dom';
//
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import './index.css';

// --------------------------------------------------
function MainLayout() {
  return (
    <div className="main-layout">
      <div className="main-header">
        <Navbar />
      </div>
      <div className="main-container">
        <div className="main-sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
}

MainLayout.displayName = 'MainLayout';
export default MainLayout;
