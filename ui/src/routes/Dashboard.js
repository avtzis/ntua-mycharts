import { Paper, Grid, Container, Divider, ListItem, ListItemText, Stack, Box } from '@mui/material'
import React from 'react'
import MyTable from '../components/MyTable'
import { useLoaderData } from 'react-router-dom'

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
            <MyTable onChangePreview={handleChangePreview} />
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