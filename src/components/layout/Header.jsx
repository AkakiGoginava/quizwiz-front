import React from "react";
import { Link } from "react-router-dom";
import { logo } from "@/assets";
import { useAuth } from "@/hook";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex justify-between items-center border-b border-gray-300 px-23 w-full h-18 sticky top-0 bg-white z-50">
      <div className="flex gap-10 items-center">
        <Link to="/">
          <img className="h-4 w-19" src={logo} alt="logo" />
        </Link>
        <Link to="/quizzes">Quizzes</Link>
      </div>
      <div className="flex gap-1">
        {isAuthenticated ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            <Link to="/register">Sign up</Link>
            <Link to="/login">Log in</Link>{" "}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
