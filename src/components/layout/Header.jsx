import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { useAuth } from "@/hook";

function Header({ navigate }) {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-23 w-full h-18 sticky top-0 bg-white z-50">
      <div className="flex gap-10 items-center">
        <Link to="/">
          <img className="h-4 w-19" src={logo} alt="logo" />
        </Link>
        <Link>Quizzes</Link>
      </div>
      <div className="flex gap-1">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/register">Sign up</Link>
            <Link>Log in</Link>{" "}
          </>
        )}
      </div>
    </header>
  );
}
Header.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Header;
