import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

const ThankYou = () => {
  return (
    <Container sx={{pt: 2}}>
      <Typography variant='h1' align='center'>
        Thank you for your purchase!
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'center', pt: 2}}>
        <Button variant='contained' href='/dashboard'>
          Go Back
        </Button>
      </Box>
    </Container>
  )
}

export default ThankYou