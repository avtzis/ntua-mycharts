import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Switch, ThemeProvider, Toolbar, useMediaQuery, Button, Box } from '@mui/material'
import Copyright from '../components/Copyright';
import darkTheme from '../utilities/darkTheme';
import mainTheme from '../utilities/mainTheme';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import api from '../utilities/api';

const Layout = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [cookies, setCookie] = useCookies(['dark']); 
  const [darkMode, setDarkMode] = React.useState(cookies['dark'] === undefined ? (prefersDarkMode === 'false' ? false : true) : (cookies['dark'] === 'false' ? false : true));

  axios.defaults.withCredentials = true;

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
    setCookie('dark', !darkMode, { sameSite: 'strict' });
  };

  const handleVerify = () => {
    axios.post(`${api}/verifyLogin`).then(response => {
      console.log(response.data.message);
    }).catch(error => {
      console.error(error.response.data.message)
    })
  };

  const handleLogout = () => {
    axios.post(`${api}/logout`).then(response => {
      console.log(response.data.message);
    }).catch(error => {
      console.error(error.response.data.message);
    })
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
      <CssBaseline />
      <AppBar position='fixed' sx={{mb: 0}}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{display: 'flex'}}>
              <Switch checked={darkMode} onChange={handleChange} />
              <Button onClick={handleVerify} variant='contained' color='secondary'>Verify Login</Button>
              <Button onClick={handleLogout} variant='contained' color='secondary'>Logout</Button>
            </Box>
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