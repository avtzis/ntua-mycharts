import React from 'react';
import { Outlet } from 'react-router-dom';

// Material UI Components
import { AppBar, CssBaseline, Switch, ThemeProvider, Toolbar, useMediaQuery, Button, Box, IconButton, Typography, InputBase, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
  const [open, setOpen] = React.useState(false);

  axios.defaults.withCredentials = true;

  const transition = action => {
    return theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: action === 'enter' ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
    })
  };

  const transitionMargin = action => {
    return theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: action === 'enter' ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
    })
  };

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
      <Box sx={{display: 'flex'}}>
        <AppBar position='fixed' sx={{zIndex: theme.zIndex.drawer + 1, py: 1, transition: transitionMargin('leave'), ...(open && {ml: 240, width: `calc(100% - ${240}px)`, transition: transitionMargin('enter')})}}>
          <Toolbar sx={{pr: '24px'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <IconButton aria-label='hamburger' color='inherit' size='large' edge='start' sx={{mr: '30px'}} onClick={() => setOpen(!open)}>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <AutoGraphIcon fontSize='large' sx={{mr: 1}}/>
              <Typography variant='h6' href='/' component='a' noWrap sx={{fontFamily: 'monospace', fontWeight: 700, color: 'inherit', textDecoration: 'none', letterSpacing: '.1rem'}}>
                myCharts
              </Typography>
            </Box>
            <Box sx={{px: 3, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box>
                <Button onClick={handleVerify} color='inherit'>Verify Login</Button>
                <Button href='/create' color='inherit'>Create</Button>
              </Box>
              <Box sx={{mr: 30, backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover': {backgroundColor: alpha(theme.palette.common.white, 0.25)}, p: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 400, borderRadius: 15}}>
                <SearchIcon />
                <InputBase placeholder='Search...' sx={{color: 'inherit', pl: 1, transition: theme.transitions.create('width'), width: 'auto'}} />
              </Box>
              <Box>
                <Switch checked={darkMode} onChange={handleChange} />
                <Button onClick={handleLogout} color='inherit'>Logout</Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' sx={{'& .MuiDrawer-paper': {bgcolor: 'primary.dark', color: 'white', py: 2, whiteSpace: 'nowrap', width: 240, transition: transition('enter'), boxSizing: 'border-box', ...(!open && {overflowX: 'hidden', transition: transition('leave'), width: theme.spacing(7)})}}}>
          <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1]}} />
          <Divider />
          <List>
            {[1, 2, 3].map(number => (
              <ListItem key={number} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{color: 'inherit'}}>
                    <AutoGraphIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Item ${number}`} sx={{color: 'inherit'}} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            {[1, 2, 3, 4, 5].map(number => (
              <ListItem key={number} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{color: 'inherit'}}>
                    <AutoGraphIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Chart ${number}`} sx={{color: 'inherit'}} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component='main' sx={{flexGrow: 1, overflow: 'auto', pt: 15}}>
          <Outlet />
          <footer>
            <Copyright />
          </footer>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout;