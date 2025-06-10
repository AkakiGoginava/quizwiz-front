import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function TokenGuard({ children }) {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  if (!token) {
    return <Navigate to="/forgot-password" />;
  }

  return children;
}

TokenGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TokenGuard;
