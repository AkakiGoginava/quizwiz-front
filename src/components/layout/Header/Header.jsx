import React from "react";

import { Link } from "react-router-dom";

import { logo } from "@/assets";
import { DotIcon, MenuIcon, ProfileModal, SearchBar } from "@/components";

import { useHeader } from "./useHeader";
import MenuModal from "./MenuModal";

function Header() {
  const {
    logout,
    user,
    isLoading,
    isProfileModalOpen,
    setProfileModalOpen,
    isMenuModalOpen,
    setMenuModalOpen,
    location,
  } = useHeader();

  if (isLoading) return <></>;

  return (
    <header className="flex justify-between items-center md:border-b border-gray-300 px-3 md:px-23 w-full h-18 sticky top-0 bg-white z-50">
      <div className="flex gap-10 items-center">
        <Link to="/">
          <img className="h-5 md:h-4 w-23 md:w-19" src={logo} alt="logo" />
        </Link>

        <div className="hidden md:flex gap-2 items-center">
          {location.pathname === "/quizzes" && <DotIcon />}
          <Link to="/quizzes">Quizzes</Link>
        </div>
      </div>

      <div className="flex gap-7 text-sm items-center">
        {location.pathname === "/quizzes" && <SearchBar />}

        <MenuIcon
          className="min-h-6 min-w-6 md:hidden mr-1"
          onClick={() => setMenuModalOpen(true)}
        />
        <MenuModal
          isOpen={isMenuModalOpen}
          onClose={() => setMenuModalOpen(false)}
          user={user}
          logout={logout}
        />

        <div className="md:block hidden">
          {user ? (
            <div className="relative">
              <img
                onClick={() => setProfileModalOpen(true)}
                className="size-8 rounded-full hover:cursor-pointer"
                src={user.image}
              />

              <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setProfileModalOpen(false)}
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
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
