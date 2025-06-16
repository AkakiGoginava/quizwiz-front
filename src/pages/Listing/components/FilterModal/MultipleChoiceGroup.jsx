import React from "react";
import PropTypes from "prop-types";

function MultipleChoiceGroup({
  choices,
  selectedChoices = [],
  setSelectedChoices,
}) {
  const handleClick = function (choiceId) {
    const idStr = String(choiceId);

    const newChoices = selectedChoices.includes(idStr)
      ? selectedChoices.filter((id) => id !== idStr)
      : [...selectedChoices, idStr];
    setSelectedChoices(newChoices);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {choices.map((choice) => (
        <div key={choice.id}>
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
