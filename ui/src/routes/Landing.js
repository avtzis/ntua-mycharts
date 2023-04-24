import React from 'react'
import { Paper, Container } from '@mui/material'
import image from '../temp/output-chart.png'
import LoginButton from '../components/LoginButton'

const Landing = () => {
  return (
    <React.Fragment>
      <Container style={{paddingTop: "10px",

        backgroundColor: "#add8e6",
        width: "80%",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap"
    }}>
          <Paper variant='outlined' sx={{ width: '100%', marginTop: "10px", marginBottom: "10px" }} position={'relative'}>
              <Paper variant='outlined' position={'relative'} sx={{width: 1/3, marginLeft: "5px", marginRight: "5px"}} style={{display: "inline-block"}}>
                <img src={image} alt="Preview" width="100%" height="100%" />
              </Paper>
              <Paper variant='outlined'  position={'relative'} sx={{width: 1/3, marginLeft: "5px", marginRight: "5px"}} style={{display: "inline-block"}}>
                <img src={image} alt="Preview" width="100%" height="100%" />
              </Paper>
              <Paper variant='outlined'  position={'relative'} sx={{width: 1/3, marginLeft: "5px", marginRight: "5px"}} style={{display: "inline-block"}}>
                <img src={image} alt="Preview" width="100%" height="100%" />
              </Paper>
              
          </Paper>
      </Container>
      <Container>
        <center>
          <p>
            Press a diagram above to see how this works, or login with you Google account by pressing the button below
          </p>
          <LoginButton />
        </center>
      </Container>
      
    </React.Fragment>
  )
}
   
export default Landing;