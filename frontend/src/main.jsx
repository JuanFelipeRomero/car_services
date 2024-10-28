import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import { PolarizedInfo } from './pages/PolarizedInfoPage';
import { RegisterWelcome } from './pages/registerPages/RegisterWelcome';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/polarizedinfo',
    element: <PolarizedInfo />,
  },
  {
    path: '/registerwelcome',
    element: <RegisterWelcome />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
