import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import api from '../utilities/api'
import MyAlert from '../components/MyAlert'

const blank = {
  title: undefined,
  price: undefined
}

let message = 'There has been an error';
let severity = 'error';

const Purchase = () => {
  const data = useLoaderData();
  let tiers = data.tiers;
  tiers.sort((a, b) => a.price > b.price);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [selected, setSelected] = React.useState(blank);

  const handleBuy = tier => {
    setSelected(tier);
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleConfirm = () => {
    axios.post(`${api}/credits/purchase?id=${selected._id}`).then(response => {
      window.location.href = response.data.url;
    }).catch(error => {
      setOpenAlert(true);
      console.error(error);
    });
  }

  return (
    <React.Fragment>
      <MyAlert open={openAlert} message={message} severity={severity} handleClose={() => setOpenAlert(false)} />
      <Container component='main' maxWidth='sm' sx={{pt: 8, pb: 6}}>
        <Typography variant='h2' align='center' color='text.primary'>
          Purchace Credits
        </Typography>
        <Typography variant='h5' align='center' color='text.secondary'>
          Minim mollit laborum cillum proident. Velit laboris eu dolor fugiat aliqua aute voluptate cupidatat minim ad magna. Aute magna proident ipsum culpa tempor occaecat irure magna anim magna. 
        </Typography>
      </Container>
      <Container component='main' maxWidth='md'>
        <Grid container spacing={5} alignItems='flex-end'>
          {tiers.map(tier => (
            <Grid item md={3} key={tier.title}>
              <Card raised>
                <CardHeader title={tier.title} subheader={tier.subheader} titleTypographyProps={{align: 'center'}} subheaderTypographyProps={{align: 'center'}} sx={{backgroundColor: tier.color}} />
                <CardContent>
                  <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2}}>
                    <Typography variant='h3' color='text.primary'>
                      {tier.price}€
                    </Typography>
                  </Box>
                  <Typography variant='subtitle1' align='center'>
                    {tier.credits} credits
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant='contained' onClick={() => handleBuy(tier)}>
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby='confirm-title' aria-describedby='confirm-description'>
        <DialogTitle id='confirm-title'>
          Please confirm your purchase
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to buy the ${selected.title} Package for ${selected.price}€? You will be redirected to the payment page.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back</Button>
          <Button onClick={handleConfirm}>COnfirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Purchase