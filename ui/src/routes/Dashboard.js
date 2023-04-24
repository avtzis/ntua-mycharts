import { Paper, Grid, Container, Divider, ListItem, ListItemText, Stack, Box } from '@mui/material'
import React from 'react'
import MyTable from '../components/MyTable'
import { useLoaderData } from 'react-router-dom'
import dateDiff from '../utilities/dateDiff'

const BlankPreview = () => {
  return (
    <Box sx={{height: 492, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      Select a chart to preview
    </Box>
  )
}

const Dashboard = () => {
  const data = useLoaderData();
  const user = data.user;
  console.log(data);

  const [preview, setPreview] = React.useState(BlankPreview);

  const handleChangePreview = chart => {
    setPreview(chart);
  }

  return (
    <React.Fragment>
      <Container maxWidth='md' sx={{py: 2}}>
        <Stack direction='row' spacing={10} divider={<Divider orientation="vertical" flexItem />}>
          <ListItem>
            <ListItemText primary='Number of charts' secondary={data.charts.length} />
          </ListItem>
          <ListItem>
            <ListItemText primary='Available credits' secondary={user.credits} />
          </ListItem>
          <ListItem>
            <ListItemText primary='Last login' secondary={dateDiff(user['lastLogin'])} />
          </ListItem>
        </Stack>
      </Container>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <MyTable onChangePreview={handleChangePreview} charts={data.charts} />
          </Grid>
          <Grid item md={6}>
            <Paper variant='outlined' sx={{ width: '100%' }}>
              {preview}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Dashboard