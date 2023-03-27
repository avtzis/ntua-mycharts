import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <React.Fragment>
      <Container sx={{pt: 5}}>
        <Typography align='center' variant='h2'>About Us</Typography>
      </Container>
      <Container sx={{p: 2}}>
        <Typography variant='h4'>What we are</Typography>
        <Paper variant='outlined' sx={{p: 1}}>
          <Typography variant='body'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin lectus sagittis erat egestas congue. In efficitur vehicula feugiat. Ut ac euismod turpis, vehicula semper leo. Sed non rhoncus metus, et dignissim massa. Sed id placerat erat. Donec sit amet orci sagittis, suscipit ligula in, accumsan velit. Vivamus at suscipit mi. Donec mattis finibus diam, id condimentum nibh laoreet at. Vivamus vitae cursus neque. Mauris et cursus diam. Nam lobortis tortor vulputate nisi feugiat egestas. 
          </Typography>
        </Paper>
      </Container>
      <Container sx={{p: 2}}>
        <Typography variant='h4'>Pricing</Typography>
        <Paper variant='outlined' sx={{p: 1}}>
          <Typography variant='body'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin lectus sagittis erat egestas congue. In efficitur vehicula feugiat. Ut ac euismod turpis, vehicula semper leo. Sed non rhoncus metus, et dignissim massa. Sed id placerat erat. Donec sit amet orci sagittis, suscipit ligula in, accumsan velit. Vivamus at suscipit mi. Donec mattis finibus diam, id condimentum nibh laoreet at. Vivamus vitae cursus neque. Mauris et cursus diam. Nam lobortis tortor vulputate nisi feugiat egestas. 
          </Typography>
        </Paper>
      </Container>
      <Container sx={{p: 2}}>
        <Typography variant='h4'>For Developers</Typography>
        <Paper variant='outlined' sx={{p: 1}}>
          <Typography variant='body'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin lectus sagittis erat egestas congue. In efficitur vehicula feugiat. Ut ac euismod turpis, vehicula semper leo. Sed non rhoncus metus, et dignissim massa. Sed id placerat erat. Donec sit amet orci sagittis, suscipit ligula in, accumsan velit. Vivamus at suscipit mi. Donec mattis finibus diam, id condimentum nibh laoreet at. Vivamus vitae cursus neque. Mauris et cursus diam. Nam lobortis tortor vulputate nisi feugiat egestas. 
          </Typography>
        </Paper>
      </Container>
      <Container sx={{p: 2}}>
        <Typography variant='h4'>What we are</Typography>
        <Paper variant='outlined' sx={{p: 1}}>
          <Typography variant='body'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin lectus sagittis erat egestas congue. In efficitur vehicula feugiat. Ut ac euismod turpis, vehicula semper leo. Sed non rhoncus metus, et dignissim massa. Sed id placerat erat. Donec sit amet orci sagittis, suscipit ligula in, accumsan velit. Vivamus at suscipit mi. Donec mattis finibus diam, id condimentum nibh laoreet at. Vivamus vitae cursus neque. Mauris et cursus diam. Nam lobortis tortor vulputate nisi feugiat egestas. 
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default About