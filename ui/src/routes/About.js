import { Box, Container, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';

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
          At our core, we are a platform that empowers users to easily create and purchase professional-grade charts for any purpose. Whether you're an analyst, marketer, or simply want to present data in a visually appealing way, our platform offers a range of customizable options to suit your needs. We believe that data visualization should be accessible to everyone, which is why we strive to make our platform easy to use, affordable, and user-friendly.
          </Typography>
        </Paper>
      </Container>
      <Container sx={{p: 2}}>
        <Typography variant='h4'>Pricing</Typography>
        <Paper variant='outlined' sx={{p: 1}}>
          <Typography variant='body'>
          We understand that affordability is a key consideration for many of our users, which is why we offer flexible pricing options to suit a range of budgets. Our basic plan offers a range of essential features for those on a tighter budget, while our premium plans offer more advanced features such as custom branding, unlimited chart creation, and more. Whether you're an individual or a large organization, we have a pricing plan that will suit your needs.
          </Typography>
        </Paper>
      </Container>
      <Container sx={{p: 2}}>
        <Typography variant='h4'>For Developers</Typography>
        <Paper variant='outlined' sx={{p: 1}}>
          <Typography variant='body'>
          For developers, our platform offers a range of APIs and integrations to help you seamlessly integrate our charts into your applications. Our APIs offer full programmatic control over chart creation, while our integrations with popular platforms such as WordPress and Shopify make it easy to embed charts directly into your website. Additionally, our platform offers a range of customizable options, including styling, data source integration, and more, allowing developers to create charts that seamlessly fit into their applications.
          </Typography>
        </Paper>
      </Container>
      <Container sx={{pt: 3}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <IconButton href='https://github.com/ntua/SaaS23-01'>
            <GitHubIcon />
          </IconButton>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default About