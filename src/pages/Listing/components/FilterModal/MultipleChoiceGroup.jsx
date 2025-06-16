import React, { useRef } from "react";
import PropTypes from "prop-types";

function MultipleChoiceGroup({
  choices,
  selectedChoices = [],
  setSelectedChoices,
  name,
}) {
  const inputRefs = useRef([]);

  const handleClick = function (choiceId) {
    setSelectedChoices((prev) => {
      const idStr = String(choiceId);

      return prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr];
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {choices.map((choice, index) => (
        <div key={choice.id}>
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="checkbox"
            name={name}
            value={choice.id}
            checked={selectedChoices.includes(String(choice.id))}
            className="hidden"
            readOnly
          />

          <div
            onClick={() => handleClick(choice.id)}
            style={
              selectedChoices.includes(String(choice.id))
                ? { backgroundColor: choice?.color || "black", color: "#fff" }
                : { color: choice?.color || "black" }
            }
            className="font-medium px-3 py-1 rounded-2xl transition hover:cursor-pointer hover:opacity-80"
          >
            {choice.name}
          </div>
        </div>
      ))}
    </div>
  );
}

MultipleChoiceGroup.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  selectedChoices: PropTypes.arrayOf(PropTypes.string),
  setSelectedChoices: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default MultipleChoiceGroup;
