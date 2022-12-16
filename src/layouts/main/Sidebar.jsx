import React from 'react';
import { Link } from 'react-router-dom';

import { PUBLIC_PATHS } from '@routes/path';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>

      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={PUBLIC_PATHS.post.root}>Post</Link>
          </li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
}

Sidebar.displayName = 'Sidebar';

export default Sidebar;
