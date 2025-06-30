import React from "react";
import PropTypes from "prop-types";

import { cn } from "@/helper";

function CategoryButton({ isActive, children, onClick }) {
  return (
    <button
      type="button"
      className={cn(
        "pb-4 text-gray-500 text-sm font-semibold text-nowrap hover:cursor-pointer hover:opacity-80",
        {
          "border-b-2 text-black": isActive,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

CategoryButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;
