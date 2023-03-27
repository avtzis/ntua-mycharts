// Router DOM
import { createBrowserRouter } from 'react-router-dom';

// Import Routes
import Layout from './routes/Layout';
import Error from './routes/Error';
import Landing from './routes/Landing';
import About from './routes/About';
import Dashboard from './routes/Dashboard';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  errorElement: <Error />,
  children: [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
  ]
}]);

export default router;