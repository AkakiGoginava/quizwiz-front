import React from "react";
import PropTypes from "prop-types";

function InputErrorMessage({ error }) {
  return error ? (
    <span className="absolute -bottom-5.5 text-sm text-red-500">
      {error.message}
    </span>
  ) : null;
}

InputErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default InputErrorMessage;
