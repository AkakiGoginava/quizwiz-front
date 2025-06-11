import React from "react";
import PropTypes from "prop-types";
import logo from "@/assets/images/logo.png";
import ArrowIcon from "@/assets/svg/arrow-icon.svg?react";
import { Link, useNavigate } from "react-router-dom";

function AuthLayout({ coverImg, children }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-16.5">
      <Link to="/" className="absolute top-10 left-10">
        <img src={logo} alt="logo" />
      </Link>

      <img
        src={coverImg}
        alt="cover image"
        className="w-auto h-auto max-w-none"
      />

      <div className="flex flex-col">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex gap-2 mb-12 mt-11 font-medium text-gray-500 items-center hover:cursor-pointer hover:opacity-85"
        >
          <ArrowIcon />
          Back
        </button>
        <div className="pl-6">{children}</div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  coverImg: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
