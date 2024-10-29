import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import { PolarizedInfo } from './pages/PolarizedInfoPage';
import { RegisterWelcome } from './pages/registerPages/RegisterWelcome';
import { PersonalInfoForm } from './pages/registerPages/RegisterPersonalInfo';
import { VehicleInfoForm } from './pages/registerPages/RegisterVehicleInfo';
import { LoginPage } from './pages/LoginPage';

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
  {
    path: '/registerpersonalinfo',
    element: <PersonalInfoForm />,
  },
  {
    path: '/registervehicleinfo',
    element: <VehicleInfoForm />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
