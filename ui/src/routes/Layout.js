import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Container, Toolbar } from '@mui/material'
import Copyright from '../components/Copyright';

const Layout = () => {
  return (
    <React.Fragment>
      {<AppBar position='fixed' sx={{mb: 0}}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>

          </Toolbar>
        </Container>
      </AppBar>}
      <main style={{position: 'relative', paddingTop: 60}}>
        <Outlet />
      </main>
      <footer>
        <Copyright />
      </footer>
    </React.Fragment>
  )
}

export default Layout;