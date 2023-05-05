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
          <Box sx={{width: 200}}>
            <LoginButton />
          </Box>
        </Box>
      </Container>}

      <center>
      <ImageList sx={{ width: 0.75, height: 1/2 }}>
        {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <a href={item.URL}><ImageListItemBar
            title={item.title}
            position="below"
          /></a> 
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            style={{borderRadius: "20px"}}
          />
        </ImageListItem>
        ))}
      </ImageList>
     </center>
     <center>
      <Button variant="outlined"><a href="./"> Go top </a></Button>
     </center>
    </React.Fragment>
  )
}
   

const itemData = [
  {
    img: image,
    title: 'Line Diagram',
    URL: './preview/line'
  },
  {
    img: image,
    title: 'Area Chart',
    URL: './preview/area'
  },
  {
    img: image,
    title: 'Column Diagram',
    URL: './preview/column'
  },
  {
    img: image,
    title: 'Pie Chart',
    URL: './preview/pie'
  },
  {
    img: image,
    title: 'Dependenxy Wheel',
    URL: './preview/dependencywheel'
  },
  {
    img: image,
    title: 'Network Graph',
    URL: './preview/networkgraph'
  },
  {
    img: image,
    title: 'Word Cloud',
    URL: './preview/wordcloud'
  },
  {
    img: image,
    title: 'Organisation Chart',
    URL: './preview/organization'
  },
  {
    img: image,
    title: 'Polar Graph',
    URL: './preview/polar'
  },
];

export default Landing;