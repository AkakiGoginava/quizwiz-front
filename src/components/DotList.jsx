import React from "react";
import PropTypes from "prop-types";

function DotList({ items }) {
  return (
    <div className="w-full overflow-ellipsis">
      {items?.map((category, i) => (
        <React.Fragment key={i}>
          <span className="font-semibold text-blue text-sm">
            {category.name}
          </span>
          {i < items.length - 1 && (
            <span className="mx-1.5 text-gray-300 text-sm">•</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

DotList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DotList;
