export const handleSubmit = function (e, navigate, inputRef) {
  e.preventDefault();
  navigate(`/quizzes?title=${inputRef.current.value}`);
};

export const handleBackdropClick = (e, onClose) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};
