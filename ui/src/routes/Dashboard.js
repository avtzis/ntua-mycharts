import { Container, Paper } from '@mui/material'
import React from 'react'
import MyTable from '../components/MyTable'
import image from '../temp/output-chart.png'

const Dashboard = () => {
  return (
    <React.Fragment>
      <Container maxWidth='md'>
        <Paper variant='outlined'>
          <img src={image} alt='png' />
        </Paper>
      </Container>
      <MyTable />
    </React.Fragment>
  )
}

export default Dashboard