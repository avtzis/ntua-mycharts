import { Paper, Grid, Container, /* Box, Typography, */ Divider, ListItem, ListItemText, Stack } from '@mui/material'
import React from 'react'
import MyTable from '../components/MyTable'
import { useLoaderData } from 'react-router-dom'
import highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import options from '../temp/chart-options1.json'

const Dashboard = () => {
  const data = useLoaderData();
  const user = data.user;
  console.log(data);
  console.log(options);

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
            <ListItemText primary='last login' secondary={user['lastLogin']} />
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
              <HighchartsReact highcharts={highcharts} options={{...options, chart:{...options.chart, height: 492}}} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard