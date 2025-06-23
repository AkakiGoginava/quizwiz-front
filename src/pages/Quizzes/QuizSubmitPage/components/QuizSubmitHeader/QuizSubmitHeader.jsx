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
import { cn, formatTime } from "@/helper";
import { useQuizSubmitHeader } from "./useQuizSubmitHeader";

function QuizSubmitHeader({ quiz, isLoading }) {
  const { showQuizInfo, categoryNames } = useQuizSubmitHeader(quiz);

  if (isLoading) return <div>...</div>;

  return (
    <header className="fixed z-20 bg-white flex items-center px-24 py-3.5 w-full border-b border-gray-200">
      <div
        className={cn(
          "flex gap-8 items-center border border-gray-300 rounded-lg px-4 py-2 transition-all duration-300 opacity-0 -translate-y-4 pointer-events-none",
          {
            "opacity-100 translate-y-0 pointer-events-auto": showQuizInfo,
          }
        )}
      >
        <h3 className="font-bold">{quiz.title}</h3>

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

      <CrossIcon className="ml-auto size-6 text-gray-800 transition hover:cursor-pointer hover:opacity-80" />
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
};

export default QuizSubmitHeader;
