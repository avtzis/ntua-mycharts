import React from 'react';
import ReactDOM from 'react-dom/client';

// Providers
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { DndProvider } from 'react-dnd';

// Router
import router from './router';

// etc
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <GoogleOAuthProvider clientId='370089780045-lc3htgodlbfcpv4d55jgadm7dofhn8m7.apps.googleusercontent.com'>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </GoogleOAuthProvider>
  </CookiesProvider>
);