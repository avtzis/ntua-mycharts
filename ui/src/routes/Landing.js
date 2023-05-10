import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import imageLine from '../previews/line.png';
import imageArea from '../previews/area.png';
import imageColumn from '../previews/column.png';
import imagePie from '../previews/pie.png';
import imageDependency from '../previews/dependency.png';
import imageNetwork from '../previews/network.png';
import imageWordcloud from '../previews/wordcloud.png';
import imageOrg from '../previews/org.png';
import imagePolar from '../previews/polar.png';
import LoginButton from '../components/LoginButton'
import { useOutletContext } from 'react-router-dom'
import { lightBlue } from '@mui/material/colors';

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

      <center>
      <ImageList sx={{ width: 0.75, height: 1/2 }}>
        {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <a href={item.URL} style={{color: 'lightBlue'}}><ImageListItemBar
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
      <Button variant="outlined"><a href="./" style={{textDecoration: 'none'}}> Up </a></Button>
     </center>
      
    </React.Fragment>
  )
}
   
const itemData = [
  {
    img: imageLine,
    title: 'Line Diagram',
    URL: './preview/line'
  },
  {
    img: imageArea,
    title: 'Area Chart',
    URL: './preview/area'
  },
  {
    img: imageColumn,
    title: 'Column Diagram',
    URL: './preview/column'
  },
  {
    img: imagePie,
    title: 'Pie Chart',
    URL: './preview/pie'
  },
  {
    img: imageDependency,
    title: 'Dependency Wheel',
    URL: './preview/dependencywheel'
  },
  {
    img: imageNetwork,
    title: 'Network Graph',
    URL: './preview/networkgraph'
  },
  {
    img: imageWordcloud,
    title: 'Wordcloud',
    URL: './preview/wordcloud'
  },
  {
    img: imageOrg,
    title: 'Organisation Chart',
    URL: './preview/organization'
  },
  {
    img: imagePolar,
    title: 'Polar Graph',
    URL: './preview/polar'
  },
];


export default Landing;