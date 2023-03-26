import React from 'react';
import ReactDOM from 'react-dom/client';

// Providers
import { RouterProvider } from 'react-router-dom';

// Router
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);