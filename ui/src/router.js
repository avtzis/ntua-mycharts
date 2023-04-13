// Router DOM
import { createBrowserRouter } from 'react-router-dom';

// Import Routes
import Layout from './routes/Layout';
import Error from './routes/Error';
import Landing from './routes/Landing';
import About from './routes/About';
import Dashboard from './routes/Dashboard';
import Create from './routes/Create';

// Loaders
import getUser from './utilities/getUser';

// Import and Configure Axios
import axios from 'axios';
import Purchase from './routes/Purchase';
axios.defaults.withCredentials = true;

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
      element: <Dashboard />,
      loader: getUser,
    },
    {
      path: '/create',
      element: <Create />
    },
    {
      path: '/purchase',
      element: <Purchase />
    }
  ]
}]);

export default router;