const handleRadio = (value, setRadioValue) => {
  setRadioValue((prev) => (prev === value ? "" : value));
};

export default handleRadio;
