import React from 'react'
import { Paper, Container, Typography, Box } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import image from '../temp/output-chart.png'
import LoginButton from '../components/LoginButton'
import { useOutletContext } from 'react-router-dom'

const Landing = () => {
  const isLoggedIn = useOutletContext();

  return (
    <React.Fragment>
      <Container style={{
        paddingTop: "10px",
        width: "80%",
        overflowX: "hidden",
        overflowY: "auto",
        whiteSpace: "nowrap"
      }}>
      <center> 
      <ImageList sx={{ width: 1, height: 1/2 }}>
      {itemData.map((item) => (
       <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <a href={item.URL}><ImageListItemBar
            title={item.title}
            position="below"
          /></a> 
        </ImageListItem>
      ))}
    </ImageList>
    </center> 
    </Container>
      {isLoggedIn || 
      <Container>
        <Typography align='center'>
          Press a diagram above to see how this works, or login with you Google account by pressing the button below
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Box sx={{width: 200}}>
            <LoginButton />
          </Box>
        </Box>
      </Container>}
    </React.Fragment>
  )
}
   

const itemData = [
  {
    img: image,
    title: 'Column Diagram',
    URL: 'http://localhost:3000/preview/column'
  },
  {
    img: image,
    title: 'Pie Chart',
    URL: 'http://localhost:3000/preview/pie'
  },
  {
    img: image,
    title: 'Dependenxy Wheel',
    URL: 'http://localhost:3000/preview/dependencywheel'
  },
  {
    img: image,
    title: 'Network Graph',
    URL: 'http://localhost:3000/preview/networkgraph'
  },
  {
    img: image,
    title: 'Word Cloud',
    URL: 'http://localhost:3000/preview/wordcloud'
  },
  {
    img: image,
    title: 'Organisation Chart',
    URL: 'http://localhost:3000/preview/organization'
  },
  {
    img: image,
    title: 'Polar Graph',
    URL: 'http://localhost:3000/preview/polar'
  },
];

export default Landing;