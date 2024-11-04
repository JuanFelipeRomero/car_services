import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import { PolarizedInfo } from './pages/PolarizedInfoPage';
import { RegisterWelcome } from './pages/registerPages/RegisterWelcome';
import { PersonalInfoForm } from './pages/registerPages/RegisterPersonalInfo';
import { VehicleInfoForm } from './pages/registerPages/RegisterVehicleInfo';
import { LoginPage } from './pages/LoginPage';

import { SelectVehicle } from './pages/appointmentPages/SelectVehicle';
import { PolarizedFeatures } from './pages/appointmentPages/PolarizedFeatures';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PolarizedSelectedFeatures } from './pages/appointmentPages/PolarizedSelectedFeatures';
import CostAndTime from './pages/appointmentPages/CostAndTime';
import ScheduleAppointment from './pages/appointmentPages/ScheduleAppointment';

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

  // ----- rutas agendamiento citas -----
  {
    path: '/selectcar',
    element: <SelectVehicle />,
  },
  {
    path: '/selectpolarizedfeatures',
    element: <PolarizedFeatures />,
  },
  {
    path: '/selectedpolarizedfeatures',
    element: <PolarizedSelectedFeatures />,
  },
  {
    path: '/costandtime',
    element: <CostAndTime />,
  },
  {
    path: '/schedule',
    element: <ScheduleAppointment />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
