/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginView, SignupView } from '../features/auth';
import RouteWrapper from './RouteWrapper';
import Clients from '../features/clients/Clients';
import Debugger from '../features/debugger/Debugger';
import { EmailRoute } from '../features/emailRoute';
import VerificationLinkExpirationMessage from '../components/TokenExpirationMessage/VerificationLinkExpirationMessage';
import ResetLinkExpirationMessage from '../components/TokenExpirationMessage/ResetLinkExpirationMessage';
import { ForgotPassword } from '../features/forgotPassword';

const routesList = [
  {
    path: '/signin',
    isPrivate: false,
    component: <LoginView />,
  },
  {
    path: '/signup',
    isPrivate: false,
    component: <SignupView />,
  },
  {
    path: '/forgot-password',
    isPrivate: false,
    component: <ForgotPassword />,
  },
  {
    path: '/clients',
    isPrivate: true,
    component: <Clients />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/debugger',
    isPrivate: true,
    component: <Debugger />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/emailroute',
    isPrivate: true,
    component: <EmailRoute />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/verificationtoken-expired',
    isPrivate: true,
    component: <VerificationLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
  {
    path: '/resetpasswordtoken-expired',
    isPrivate: true,
    component: <ResetLinkExpirationMessage />,
    hasNavbar: true,
    hasFooter: true,
  },
];

const Routes2 = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesList.map((route) => (
          <Route
            path={route.path}
            element={
              <RouteWrapper
                component={route.component}
                isPrivate={route.isPrivate}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default memo(Routes2);
