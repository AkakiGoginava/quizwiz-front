import React from "react";
import PropTypes from "prop-types";
import Header from "@/layout/Header.jsx";
import Footer from "@/layout/Footer.jsx";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
