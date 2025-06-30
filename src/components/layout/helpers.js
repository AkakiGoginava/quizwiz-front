export const handleSubmit = function (e, navigate, inputRef) {
  e.preventDefault();

  const params = new URLSearchParams(location.search);
  params.set("title", inputRef.current.value);

  navigate(`${location.pathname}?${params.toString()}`);
};

export const handleBackdropClick = (e, onClose) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};
