import React from "react";
import PropTypes from "prop-types";
import { Header, Footer } from "./";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const { pathname } = useLocation();

  const noLayoutPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
  ];

  const hideLayout = noLayoutPaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <main className="flex flex-1 relative min-h-screen items-center">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
