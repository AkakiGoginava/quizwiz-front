import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { CheckmarkIcon } from "@/assets";
import { cn } from "@/helper";

function ToggleRadioGroup({ type, options, value, onChange }) {
  const isSortType = type === "sort";
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex gap-3 items-center font-semibold hover:cursor-pointer mr-auto",
            {
              "justify-between mr-0": isSortType,
            }
          )}
        >
          <div className="flex items-center gap-3">
            {option.icon && <span className="mr-1">{option.icon}</span>}
            <span className={clsx({ "text-gray-600": isSortType })}>
              {option.label}
            </span>
          </div>

          <div className="flex items-center relative">
            <input
              type="checkbox"
              checked={value === option.value}
              onChange={() =>
                value === option.value ? onChange("") : onChange(option.value)
              }
              className={cn(
                "ring-0 rounded checked:bg-black border-gray-300 hover:cursor-pointer",
                {
                  "peer border-none checked:bg-transparent": isSortType,
                }
              )}
            />

            {isSortType && (
              <span className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CheckmarkIcon />
              </span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

ToggleRadioGroup.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
    })
  ).isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleRadioGroup;
