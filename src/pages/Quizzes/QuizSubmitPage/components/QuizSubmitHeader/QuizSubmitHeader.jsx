import React from "react";

import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

import {
  AlternativePointsIcon,
  CrossIcon,
  HashtagIcon,
  PinIcon,
  RocketIcon,
  TimeIcon,
} from "@/components";
import { cn, formatTime, formatSeconds } from "@/helper";

import { useQuizSubmitHeader } from "./useQuizSubmitHeader";

function QuizSubmitHeader({
  quiz,
  isLoading,
  onSubmit,
  timeLeft,
  markedCount,
}) {
  const { showQuizInfo, categoryNames, navigate } = useQuizSubmitHeader(quiz);

  if (isLoading) return <div>...</div>;

  return (
    <header className="fixed z-20 bg-white flex flex-col md:flex-row gap-4 md:gap-0 items-center md:h-18 px-4.5 md:px-24 pb-9 pt-3.5 md:py-3.5 w-full border-b border-gray-200">
      <div className="flex flex-col w-full md:flex-row-reverse md:items-center">
        <CrossIcon
          className="ml-auto size-6 text-gray-800 transition hover:cursor-pointer hover:opacity-80 mb-4 md:mb-0"
          onClick={() => navigate(-1)}
        />

        <div
          className={cn("hidden gap-2", {
            flex: showQuizInfo,
          })}
        >
          <div className="flex flex-col md:flex-row flex-grow gap-2.5 md:gap-8 items-left md:items-center border border-gray-300 rounded-lg px-4 py-1">
            <h3 className="font-bold text-sm md:text-base text-nowrap text-ellipsis">
              {quiz.title}
            </h3>

            <div className="flex gap-8">
              <Tooltip
                id="my-tooltip"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "0.75rem",
                  borderRadius: "0.5rem",
                }}
              />

              <PinIcon
                className="max-h-3.5 max-w-3.5"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={categoryNames}
              />

              <HashtagIcon
                className="max-h-3.5 max-w-3.5"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${quiz.question_count} Questions`}
              />

              <AlternativePointsIcon
                className="max-h-3.5 max-w-3.5"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${quiz.points} Points`}
              />

              <RocketIcon
                className="max-h-3.5 max-w-3.5"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={`${quiz.total_users} Plays`}
              />

              <TimeIcon
                className="max-h-3.5 max-w-3.5"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={formatTime(quiz.max_time, false)}
              />
            </div>
          </div>

          <div className="flex md:hidden flex-col pt-2 pb-1.5 pl-4 w-26 border rounded-xl border-gray-300 ">
            <h6 className="text-xs font-bold">Questions</h6>

            <span className="font-semibold text-base text-green-600">
              {markedCount}/{quiz.question_count}
            </span>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full flex gap-2.5">
        <button
          type="button"
          className="bg-blue font-semibold rounded-xl py-3.5 px-28.5 text-white transition hover:cursor-pointer hover:opacity-85"
          onClick={onSubmit}
        >
          Submit
        </button>

        <div className="flex flex-col pt-2 pb-1.5 pl-4 w-26 border rounded-xl border-gray-300">
          <h6 className="text-xs font-bold">Timer</h6>

          <span className="font-semibold text-xl text-gray-700">
            {timeLeft !== null ? formatSeconds(timeLeft) : "--:--"}
          </span>
        </div>
      </div>
    </header>
  );
}

QuizSubmitHeader.propTypes = {
  quiz: PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    question_count: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    total_users: PropTypes.number.isRequired,
    max_time: PropTypes.number.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  timeLeft: PropTypes.number,
  markedCount: PropTypes.number.isRequired,
};

export default QuizSubmitHeader;
