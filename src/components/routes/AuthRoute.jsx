import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hook";

function AuthRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/register" />;
  }

  return <Outlet />;
}

export default AuthRoute;
