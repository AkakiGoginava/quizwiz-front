export const handleAnswerClick = (
  question,
  answerId,
  selectedAnswers,
  setSelectedAnswers
) => {
  const isSelected = selectedAnswers.includes(answerId);

  if (isSelected) {
    setSelectedAnswers(selectedAnswers.filter((id) => id !== answerId));
  } else if (selectedAnswers.length < question.correct_answer_count) {
    setSelectedAnswers([...selectedAnswers, answerId]);
  }
};
