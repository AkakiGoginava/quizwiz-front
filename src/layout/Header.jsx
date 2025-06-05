import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";

function Header() {
  return (
    <header className="flex justify-between items-center px-23 w-full h-18">
      <div className="flex gap-10 items-center">
        <img className="h-4 w-19" src={logo} alt="logo" />
        <Link>Quizzes</Link>
      </div>
      <div className="flex gap-1">
        <Link>Sign up</Link>
        <Link>Log in</Link>
      </div>
    </header>
  );
}

export default Header;
