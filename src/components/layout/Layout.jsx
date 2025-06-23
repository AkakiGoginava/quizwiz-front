import React from "react";
import PropTypes from "prop-types";

import { matchPath, useLocation } from "react-router-dom";

import { Header, Footer } from "@/components";

function Layout({ children }) {
  const { pathname } = useLocation();

  const noLayoutPaths = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
  ];

  const isQuizSubmitPage = matchPath("/quizzes/:id/submit", pathname);

  const hideLayout = noLayoutPaths.includes(pathname) || isQuizSubmitPage;

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <main className="flex flex-1 h-full relative items-stretch">
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
