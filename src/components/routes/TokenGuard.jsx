import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

function TokenGuard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <Navigate to="/forgot-password" />;
  }

  return <Outlet />;
}
export default TokenGuard;
