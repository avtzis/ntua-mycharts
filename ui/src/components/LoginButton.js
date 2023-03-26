import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useCookies } from 'react-cookie';

const LoginButton = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleSuccess = credentialResponse => {
    setCookie('token', credentialResponse['credential'], { sameSite: 'strict' });
    console.log('Login successful');
    setLoggedIn(true); //should use redirect instead
  };

  const handleError = () => {
    if(cookies['token']) removeCookie('token');
    console.log('Login failed');
  };

  return (
    <React.Fragment>
      {
        loggedIn ? 
          <div>Logged in</div>
          :
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      }
    </React.Fragment>
  )
}

export default LoginButton