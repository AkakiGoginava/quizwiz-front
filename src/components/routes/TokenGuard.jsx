import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function TokenGuard() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  if (!token) {
    return <Navigate to="/forgot-password" />;
  }

  return <Outlet />;
}
export default TokenGuard;
