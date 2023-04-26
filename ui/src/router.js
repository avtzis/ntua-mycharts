// Router DOM
import { createBrowserRouter } from 'react-router-dom';

// Import Routes
import Layout from './routes/Layout';
import Error from './routes/Error';
import Landing from './routes/Landing';
import About from './routes/About';
import Dashboard from './routes/Dashboard';
import Create from './routes/Create';
import Purchase from './routes/Purchase';
import ThankYou from './routes/ThankYou';
import Previews from './routes/Previews';
import Preview from './routes/Preview';

// Loaders
import getUser from './utilities/getUser';
import getTiers from './utilities/getTiers'
import getChart from './utilities/getChart';

// Import and Configure Axios
import axios from 'axios';
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
      element: <Purchase />,
      loader: getTiers
    },
    {
      path: '/purchase/thankyou',
      element: <ThankYou />
    },
    {
      path: '/previews',
      element: <Previews />
    },
    {
      path: '/preview/:chart',
      element: <Preview />,
      loader: getChart
    }
  ]
}]);

export default router;