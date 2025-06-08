import React, { useState } from "react";
import PropTypes from "prop-types";
import alertCircle from "@/assets/images/alert-circle.png";
import eyeIcon from "@/assets/images/eye-icon.png";
import { InputErrorMessage } from "./";

function InputField({
  name,
  label,
  type,
  rules,
  placeholder,
  register,
  error,
}) {
  const [inputType, setInputType] = useState(type);

  const toggleHide = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div key={name} className="relative flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm text-[#344054]">
        {label}
      </label>

      <div className="relative">
        <input
          className={`w-full px-4 py-3.5 border border-[#D0D5DD] rounded-[0.625rem] 
            focus:outline-none focus:ring-3 focus:ring-blue-300
            ${error ? "border-red-500 focus:ring-red-300" : ""}
          `}
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, rules)}
        />

        <div className="absolute top-5 right-4 flex gap-2">
          {error && <img src={alertCircle} alt="alert icon" />}

          {type === "password" && (
            <button
              onClick={toggleHide}
              className="hover:cursor-pointer"
              type="button"
            >
              <img src={eyeIcon} alt="eye icon" />
            </button>
          )}
        </div>
      </div>

      <InputErrorMessage error={error} />
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rules: PropTypes.object,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.any,
};

export default InputField;
