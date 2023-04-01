import { Container, Paper, TextField, Typography, Grid, Divider } from '@mui/material'
import React from 'react'
import DropFile from '../components/DropFile'

const Create = () => {
  return (
    <Container maxWidth='md' component='form' onSubmit={null}>
      <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant='h3' align='center'>
          Form
        </Typography>
        <Grid container spacing={3} sx={{py: 2}}>
          <Grid item xs={12} md={6}>
            <TextField name='title' label='Title' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name='title' label='Title' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name='title' label='Title' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name='title' label='Title' fullWidth />
          </Grid>
        </Grid>
        <Divider />
        <DropFile />
      </Paper>
    </Container>
  )
}

export default Create