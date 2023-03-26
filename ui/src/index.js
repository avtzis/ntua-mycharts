import React from 'react';
import ReactDOM from 'react-dom/client';

// Providers
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';

// Router
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <GoogleOAuthProvider clientId='370089780045-lc3htgodlbfcpv4d55jgadm7dofhn8m7.apps.googleusercontent.com'>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </CookiesProvider>
);