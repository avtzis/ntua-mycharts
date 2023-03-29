import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Switch, ThemeProvider, Toolbar, useMediaQuery } from '@mui/material'
import Copyright from '../components/Copyright';
import darkTheme from '../utilities/darkTheme';
import mainTheme from '../utilities/mainTheme';
import { useCookies } from 'react-cookie';

const Layout = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [cookies, setCookie] = useCookies(['dark']); 
  const [darkMode, setDarkMode] = React.useState(cookies['dark'] === undefined ? (prefersDarkMode === 'false' ? false : true) : (cookies['dark'] === 'false' ? false : true));

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
    setCookie('dark', !darkMode, { sameSite: 'strict' });
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