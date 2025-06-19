import React from "react";
import PropTypes from "prop-types";

function DotList({ items, textColor = "#4b69fd" }) {
  return (
    <div className="w-full overflow-ellipsis">
      {items?.map((category, i) => (
        <React.Fragment key={i}>
          <span className="font-semibold text-sm" style={{ color: textColor }}>
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
  textColor: PropTypes.string,
};

export default DotList;
