import React from 'react';

import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';


export default function ProtectedRoute ({
  isAuthenticated,//isAuthenticated--> true
  redirectPath = '/home',
  children
})

{


  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};







  