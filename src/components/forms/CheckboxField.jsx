import React from "react";
import PropTypes from "prop-types";
import { InputErrorMessage } from "@/components";

function CheckboxField({ name, label, register, rules, error }) {
  return (
    <div key={name} className="relative flex gap-3">
      <input
        type="checkbox"
        name={name}
        id={name}
        {...register(name, rules)}
        className="rounded-full w-5 h-5 focus:ring-0 text-black"
      />

      <label htmlFor={name} className="text-sm text-gray">
        {label}
      </label>

      <InputErrorMessage error={error} />
    </div>
  );
}

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default CheckboxField;
