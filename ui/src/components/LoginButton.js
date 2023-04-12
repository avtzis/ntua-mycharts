import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import api from '../utilities/api'

const LoginButton = () => {
  const handleSuccess = credentialResponse => {
    axios.post(`${api}/login`, {
      token: credentialResponse['credential']
    }).then(response => {
      console.log(response.data.message);
      window.location.href = '/dashboard';
    }).catch(error => {
      console.log(error.response.data.message);
    })
  };

  const handleError = () => {
    console.log('Login failed');
  };

  return (
    <React.Fragment>      
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </React.Fragment>
  )
}

export default LoginButton