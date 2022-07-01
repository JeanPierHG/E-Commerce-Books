import React from 'react';

import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';


export default function ProtectedRouteBan ({
  isAllowed,
  redirectPath = '/banned',
  children
})

{


  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

