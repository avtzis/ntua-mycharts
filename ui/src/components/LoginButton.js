import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useCookies } from 'react-cookie';

const LoginButton = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const handleSuccess = credentialResponse => {
    setCookie('token', credentialResponse['credential'], { sameSite: 'strict' });
    console.log('Login successful');
    window.location.href = '/dashboard';
  };

  const handleError = () => {
    if(cookies['token']) removeCookie('token');
    console.log('Login failed');
  };

  return (
    <React.Fragment>      
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </React.Fragment>
  )
}

export default LoginButton