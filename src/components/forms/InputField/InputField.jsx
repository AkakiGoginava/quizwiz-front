import React from "react";
import PropTypes from "prop-types";

import { useInputField } from "./useInputField";
import {
  InputErrorMessage,
  AlertIcon,
  EyeIcon,
  CrossedEyeIcon,
} from "@/components";
import { cn } from "@/helper";

function InputField({
  name,
  label,
  type,
  rules,
  placeholder,
  register,
  error,
}) {
  const { inputType, toggleHide } = useInputField(type);

  return (
    <div key={name} className="relative flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm text-gray">
        {label}
      </label>

      <div className="relative">
        <input
          className={cn(
            "w-full px-4 py-3.5 border border-light-gray rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-300",
            {
              "border-red-500 focus:ring-red-300": error,
            }
          )}
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, rules)}
        />

        <div className="absolute top-5 right-4 flex gap-2">
          {error && <AlertIcon />}

          {type === "password" && (
            <button
              onClick={toggleHide}
              className="hover:cursor-pointer"
              type="button"
            >
              {inputType === "password" ? <CrossedEyeIcon /> : <EyeIcon />}
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
