import React from "react";

export const useInputField = (type) => {
  const [inputType, setInputType] = React.useState(type);

  const toggleHide = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return { inputType, toggleHide };
};
