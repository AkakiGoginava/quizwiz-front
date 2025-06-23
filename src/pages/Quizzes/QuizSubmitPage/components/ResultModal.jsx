import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { CrossIcon, SpinningWheelIcon, SuccessIcon } from "@/components";

function ResultModal({ quiz, resultTime, resultPoints, isOpen, isPendingEnd }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center bg-black/60 backdrop-blur-[6px] z-40">
      <div className="flex flex-col p-6 w-100 h-161 bg-white z-50 rounded-xl backdrop-blur-2xl m-auto">
        {isPendingEnd ? (
          <div className="flex gap-2.5 justify-center mt-8">
            <SpinningWheelIcon
              className="min-h-6 min-w-6 animate-spin"
              strokeWidth={3}
            />{" "}
            <span className="text-blue font-semibold">Analyzing results</span>
          </div>
        ) : (
          <>
            <Link to="/quizzes">
              <CrossIcon className="min-w-5 min-h-5 text-gray ml-auto" />
            </Link>

            <div className="flex flex-col text-sm">
              <div className="flex justify-center">
                <SuccessIcon className="min-h-12 min-w-12 mb-6" />
              </div>

              <h3 className="font-semibold text-lg mb-2 text-center">
                Quiz finished
              </h3>

              <h6 className="text-gray mb-8 text-center">your results</h6>

              <p className="mb-2">Quiz Name</p>
              <p className="font-medium mb-6">{quiz.title}</p>

              <p className="mb-2">Quiz Level</p>
              <p
                className="font-medium mb-8"
                style={{ color: quiz.difficulty.color }}
              >
                {quiz.difficulty.name}
              </p>

              <p className="mb-2">Time</p>
              <p className="font-medium mb-6">{resultTime}</p>

              <p className="mb-2">Mistakes</p>
              <p className="font-medium text-red-500 mb-6">
                {quiz.points - resultPoints}
              </p>

              <p className="mb-2">Right Answers</p>
              <p className="font-medium text-green-500 mb-6">{resultPoints}</p>

              <Link
                to="/quizzes"
                className="w-full bg-blue text-white rounded-xl py-2.5 text-center font-semibold transition hover:cursor-pointer hover:opacity-80"
              >
                Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    difficulty: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  resultTime: PropTypes.string.isRequired,
  resultPoints: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isPendingEnd: PropTypes.bool.isRequired,
};

export default ResultModal;
