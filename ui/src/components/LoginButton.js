import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import api from '../utilities/api'
import MyAlert from './MyAlert';

let message = '';
let severity = 'error';

const LoginButton = () => {
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleSuccess = credentialResponse => {
    axios.post(`${api}/user/login`, {
      token: credentialResponse['credential']
    }).then(response => {
      message = response.data.message;
      severity = 'success';
      setOpenAlert(true);
      console.log(message);
      window.location.href = '/dashboard';
    }).catch(error => {
      message = error.response.data.message;
      severity = 'error';
      setOpenAlert(true);
      console.error(message);
    })
  };

  const handleError = () => {
    message = 'Google Server Error';
    severity = 'error';
    setOpenAlert(true);
    console.error('Login failed');
  };

  return (
    <React.Fragment>
      <MyAlert open={openAlert} handleClose={() => setOpenAlert(false)} severity={severity} message={message} /> 
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </React.Fragment>
  )
}

export default LoginButton