// Router DOM
import { createBrowserRouter } from 'react-router-dom';

// Import Routes
import Layout from './routes/Layout';
import Error from './routes/Error';
import Landing from './routes/Landing';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  errorElement: <Error />,
  children: [
    {
      path: '/',
      element: <Landing />
    },
  ]
}]);

export default router;