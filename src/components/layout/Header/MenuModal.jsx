import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { logo } from "@/assets";
import { CrossIcon } from "@/components/icons";

function MenuModal({ isOpen, onClose, user, logout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute z-10 top-0 left-0 flex flex-col gap-5 p-6 bg-white">
        <div className="flex gap-45.5">
          <img src={logo} alt="logo" className="w-23 h-5" />

          <CrossIcon onClick={onClose} className="min-h-6 min-w-6" />
        </div>

        <div className="w-full border-b border-gray-200" />

        <Link to="/quizzes" className="text-lg font-semibold" onClick={onClose}>
          Quizzes
        </Link>

        <div className="w-full border-b border-gray-200" />

        {user ? (
          <>
            <div className="flex gap-3 w-57">
              <div className="size-10">
                <img className="size-full rounded-full" src={user.image} />
              </div>

              <div>
                <p className="font-semibold text-nowrap overflow-hidden overflow-ellipsis">
                  {user.name}
                </p>

                <p className="text-gray text-sm text-nowrap overflow-hidden overflow-ellipsis">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="w-full border-b border-gray-200" />

            <button
              type="button"
              className="text-blue text-center text-sm font-semibold w-full py-4"
              onClick={logout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="py-4 w-full text-center bg-black text-white font-bold text-sm rounded-xl"
            >
              Sign up
            </Link>

            <Link
              to="/login"
              className="text-blue text-center text-sm font-semibold w-full py-4"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};

export default MenuModal;
