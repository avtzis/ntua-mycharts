import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material'
import React from 'react'

const tiers = [
  {
    title: 'Bronze',
    subheader: undefined,
    price: 9.99,
    credits: 15,
    color: 'peru'
  },
  {
    title: 'Silver',
    subheader: undefined,
    price: 24.99,
    credits: 50,
    color: 'silver'
  },
  {
    title: 'Gold',
    subheader: 'Most Popular',
    price: 49.99,
    credits: 150,
    color: 'goldenrod'
  },
  {
    title: 'Platinum',
    subheader: 'Ultra Premium',
    price: 99.99,
    credits: 400,
    color: 'turquoise'
  },
]

const blank = {
  title: undefined,
  price: undefined
}

const Purchase = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selected, setSelected] = React.useState(blank);

  const handleBuy = tier => {
    setSelected(tier);
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleConfirm = () => {
    console.log(selected);
    handleClose();
  }

  return (
    <React.Fragment>
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
              <Card>
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