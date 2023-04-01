import React from 'react';
import { Outlet } from 'react-router-dom';

// Material UI Components
import { AppBar, CssBaseline, Switch, ThemeProvider, Toolbar, useMediaQuery, Button, Box, IconButton, Typography, InputBase } from '@mui/material'

// Custom Components
import Copyright from '../components/Copyright';

// Themes
import darkTheme from '../utilities/darkTheme';
import mainTheme from '../utilities/mainTheme';

// Font
import 'fontsource-roboto';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SearchIcon from '@mui/icons-material/Search';

// Utilities
import { useCookies } from 'react-cookie';
import axios from 'axios';
import api from '../utilities/api';
import { alpha } from '@mui/material/styles'

const Layout = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [cookies, setCookie] = useCookies(['dark']); 
  const [darkMode, setDarkMode] = React.useState(cookies['dark'] === undefined ? (prefersDarkMode === 'false' ? false : true) : (cookies['dark'] === 'false' ? false : true));
  const [theme, setTheme] = React.useState(mainTheme);

  axios.defaults.withCredentials = true;

  React.useEffect(() => {
    setTheme(darkMode ? darkTheme : mainTheme);
  }, [darkMode]);

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
    setCookie('dark', !darkMode, { sameSite: 'none' });
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='fixed' sx={{py: 1}}>
        <Toolbar>
          <IconButton aria-label='hamburger' color='inherit' size='large' edge='start'>
            <MenuIcon />
          </IconButton>
          <AutoGraphIcon fontSize='large' sx={{mr: 1}}/>
          <Typography variant='h6' href='/' component='a' noWrap sx={{fontFamily: 'monospace', fontWeight: 700, color: 'inherit', textDecoration: 'none', letterSpacing: '.1rem'}}>
            myCharts
          </Typography>
          <Box sx={{display: 'flex'}}>
            <Switch checked={darkMode} onChange={handleChange} />
            <Button onClick={handleVerify} color='inherit'>Verify Login</Button>
            <Button onClick={handleLogout} color='inherit'>Logout</Button>
            <Button href='/create' color='inherit'>Create</Button>
          </Box>
          <Box sx={{backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover': {backgroundColor: alpha(theme.palette.common.white, 0.25)}, p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto'}}>
            <SearchIcon />
            <InputBase placeholder='Search...' sx={{color: 'inherit', pl: 1, transition: theme.transitions.create('width'), width: 'auto'}} />
          </Box>
        </Toolbar>
      </AppBar>
      <main style={{position: 'relative', paddingTop: 100}}>
        <Outlet />
      </main>
      <footer>
        <Copyright />
      </footer>
    </ThemeProvider>
  )
}

export default Layout;