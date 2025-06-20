import React from "react";
import PropTypes from "prop-types";

import { InfoIcon } from "@/components";
import { handleAnswerClick } from "./helpers";

function QuizQuestion({
  question,
  index,
  selectedAnswers = [],
  setSelectedAnswers,
}) {
  return (
    <div key={question.id} className="flex flex-col gap-5">
      <div className="flex gap-2.5 items-center font-semibold text-sm">
        <span className="text-blue">Question - {index + 1}</span>
        <span className="inline-block w-px h-2.5 bg-gray-300 align-middle mx-1"></span>
        <span className="text-pink">
          Points - {question.correct_answer_count}
        </span>
      </div>

      <h3 className="font-bold text-xl">{question.description}</h3>

      {question.correct_answer_count > 1 && (
        <div className="flex gap-2.5 items-center px-4.5 py-1.5 text-sm font-medium text-green border border-green-500 rounded-sm w-fit">
          <InfoIcon className="min-h-4 min-w-4" />
          <span>
            You can select {question.correct_answer_count} options from answers
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 text-sm text-gray">
        {question?.answers.map((answer) => {
          const checked = selectedAnswers.includes(answer.id);

          return (
            <div key={answer.id} className="relative">
              <input
                type="checkbox"
                id={answer.id}
                className="peer absolute top-5 right-5 pointer-events-none ring-0 rounded-full text-blue"
                checked={checked}
                readOnly
              />

              <label
                htmlFor={answer.id}
                className="flex items-center justify-between p-4 hover:cursor-pointer 
                border border-transparent rounded-lg transition peer-checked:border peer-checked:text-blue peer-checked:border-blue"
                onClick={() =>
                  handleAnswerClick(
                    question,
                    answer.id,
                    selectedAnswers,
                    setSelectedAnswers
                  )
                }
              >
                <span>{answer.description}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    correct_answer_count: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selectedAnswers: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  setSelectedAnswers: PropTypes.func,
};

export default QuizQuestion;
