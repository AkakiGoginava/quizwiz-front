import React from "react";
import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";

import { logo, logoBig } from "@/assets";
import { ArrowIcon, DragHandleIcon, Header } from "@/components";

function AuthLayout({ coverImg, children }) {
  const navigate = useNavigate();

  return (
    <div className="relative md:static">
      <div className="md:hidden">
        <Header />
        <img src={logoBig} />
        <div
          className="absolute inset-0 bg-black/30 z-55 backdrop-blur-sm md:hidden"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="absolute top-35 md:static flex gap-16.5 pt-4 md:pt-0 bg-white w-screen md:w-auto h-full z-60 md:z-0 rounded-t-3xl md:rounded-none">
        <Link to="/" className="absolute top-10 left-10 hidden md:block">
          <img src={logo} alt="logo" />
        </Link>

        <img
          src={coverImg}
          alt="cover image"
          className="hidden md:block max-w-full h-auto"
        />

        <div className="flex flex-col">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="hidden md:flex gap-2 mb-12 mt-11 font-medium text-gray-500 items-center hover:cursor-pointer hover:opacity-85"
          >
            <ArrowIcon />
            Back
          </button>
          <div className="pl-5 md:pl-6">
            <DragHandleIcon className="mx-auto mb-12 md:hidden" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  coverImg: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
