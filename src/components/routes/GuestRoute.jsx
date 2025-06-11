import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hook";

function GuestRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default GuestRoute;
