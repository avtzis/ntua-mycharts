import { Paper, Grid, Container, /* Box, Typography, */ Divider, ListItem, ListItemText, Stack } from '@mui/material'
import React from 'react'
import MyTable from '../components/MyTable'
import image from '../temp/output-chart.png'

const Dashboard = () => {
  return (
    <React.Fragment>
      <Container maxWidth='md' sx={{py: 2}}>
        <Stack direction='row' spacing={10} divider={<Divider orientation="vertical" flexItem />}>
          <ListItem>
            <ListItemText primary='number of charts' secondary='15' />
          </ListItem>
          <ListItem>
            <ListItemText primary='available credits' secondary='2' />
          </ListItem>
          <ListItem>
            <ListItemText primary='last login' secondary='2 hours ago' />
          </ListItem>
        </Stack>
      </Container>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <MyTable />
          </Grid>
          <Grid item md={6}>
            <Paper variant='outlined' sx={{ width: '100%' }}>
              <img src={image} alt='png' style={{ maxHeight: 450 }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard