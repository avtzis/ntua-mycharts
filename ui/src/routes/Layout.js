import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <React.Fragment>
      <head></head>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* copyright? */}
      </footer>
    </React.Fragment>
  )
}

export default Layout;