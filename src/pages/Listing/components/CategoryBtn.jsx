import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/helper";

function CategoryBtn({ isActive, children }) {
  return (
    <button
      type="button"
      className={cn(
        "pb-4 text-gray text-nowrap hover:cursor-pointer hover:opacity-80",
        {
          "border-b-2 text-black": isActive,
        }
      )}
    >
      {children}
    </button>
  );
}

CategoryBtn.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default CategoryBtn;
