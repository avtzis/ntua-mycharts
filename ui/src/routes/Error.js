import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

const Error = () => {
  return (
    <React.Fragment>
      <Container>
        <Typography variant='h1' align='center'>ERROR</Typography>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button variant='contained' href='/'>Go Back</Button>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Error