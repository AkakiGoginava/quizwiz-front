import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function GuestRoute() {
  const { user, verifyEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (user && location.pathname === "/login" && token) {
      verifyEmail({ token });
    }
  }, [location, user, navigate]);

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default GuestRoute;
