import { Paper, Grid, Container } from '@mui/material'
import React from 'react'
import MyTable from '../components/MyTable'
import image from '../temp/output-chart.png'

const Dashboard = () => {
  return (
    <React.Fragment>
      <Container>
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