import React from "react";

const useInputField = (type) => {
  const [inputType, setInputType] = React.useState(type);

  const toggleHide = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return { inputType, toggleHide };
};

export default useInputField;
