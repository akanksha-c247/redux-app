// privateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import Header from './components/header/Header';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  if (isAuthenticated) {
    return (
      <Route
        {...rest}
        element={
          <div>
            <Header />
            <Component />
          </div>
        }
      />
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
