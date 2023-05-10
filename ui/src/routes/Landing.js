import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import image from '../temp/output-chart.png'
import LoginButton from '../components/LoginButton'
import { useOutletContext } from 'react-router-dom'

const Landing = () => {
  const { isLoggedIn } = useOutletContext();

  return (
    <React.Fragment>
      {isLoggedIn || 
      <Container style={{marginTop: "20px"}}>
        <Typography align='center' id="Top">
          Press a diagram below to see how this works, or login with you Google account by pressing the button below
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Box sx={{width: 201}}>
            <LoginButton />
          </Box>
        </Box>
      </Container>}

      
    </React.Fragment>
  )
}
   



export default Landing;