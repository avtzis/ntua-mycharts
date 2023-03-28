import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Switch, ThemeProvider, Toolbar } from '@mui/material'
import Copyright from '../components/Copyright';
import darkTheme from '../utilities/darkTheme';
import mainTheme from '../utilities/mainTheme';

const Layout = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
      <CssBaseline />
      <AppBar position='fixed' sx={{mb: 0}}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Switch checked={darkMode} onChange={handleChange} />
          </Toolbar>
        </Container>
      </AppBar>
      <main style={{position: 'relative', paddingTop: 75}}>
        <Outlet />
      </main>
      <footer>
        <Copyright />
      </footer>
    </ThemeProvider>
  )
}

export default Layout;