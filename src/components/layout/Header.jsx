import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo, Dot } from "@/assets";
import { useAuth } from "@/hook";
import { useLocation } from "react-router-dom";
import { ProfileModal, SearchBar } from "./";

function Header() {
  const { logout, user, isLoading } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);

  const location = useLocation();

  if (isLoading) return <></>;

  return (
    <header className="flex justify-between items-center border-b border-gray-300 px-23 w-full h-18 sticky top-0 bg-white z-50">
      <div className="flex gap-10 items-center">
        <Link to="/">
          <img className="h-4 w-19" src={logo} alt="logo" />
        </Link>

        <div className="flex gap-2 items-center">
          {location.pathname === "/quizzes" && <Dot />}
          <Link to="/quizzes">Quizzes</Link>
        </div>
      </div>

      <div className="flex gap-7 text-sm">
        {(location.pathname === "/quizzes" ||
          location.pathname === "/quiz") && <SearchBar />}

        {user ? (
          <div className="relative">
            <img
              onClick={() => setModalOpen(true)}
              className="size-8 rounded-full hover:cursor-pointer"
              src={user.image}
            />

            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              user={user}
              logout={logout}
            />
          </div>
        ) : (
          <div className="flex gap-1">
            <Link
              to="/register"
              className="font-bold py-2.5 px-5.5 text-white bg-black transition rounded hover:opacity-80"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="font-bold py-2.5 px-5.5 text-blue transition hover:opacity-80"
            >
              Log in
            </Link>{" "}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
