import React from "react";
import PropTypes from "prop-types";

function ToastContent({ title, message }) {
  return (
    <div>
      <p className="font-bold text-lg font-raleway">{title}</p>
      <p className="font-normal text-sm">{message}</p>
    </div>
  );
}

ToastContent.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastContent;
