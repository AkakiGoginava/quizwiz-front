import React from "react";

import { Controller } from "react-hook-form";

import {
  AlternativePointsIcon,
  DotList,
  HashtagIcon,
  PinIcon,
  RocketIcon,
  SpinningWheelIcon,
  TimeIcon,
} from "@/components";
import { formatTime } from "@/helper";

import { QuizQuestion, QuizSubmitHeader } from "./components";
import { formatSeconds } from "./helpers";
import { useQuizSubmitPage } from "./useQuizSubmitPage";

function QuizSubmitPage() {
  const {
    control,
    handleSubmit,
    timeLeft,
    isLoading,
    openQuiz,
    questions,
    isPending,
    isSuccess,
  } = useQuizSubmitPage();

  if (!isSuccess) return <div>something went wrong</div>;

  return (
    <div className="size-full">
      <QuizSubmitHeader quiz={openQuiz} isLoading={isLoading} />

      <section className="flex flex-col gap-23.5 py-15 px-25 mt-18">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-center font-bold text-4.5xl">
            {openQuiz?.title}
          </h1>

          <section className="flex gap-4 justify-center font-semibold text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <PinIcon className="min-h-5 min-w-5" />

              <DotList textColor="#667085" items={openQuiz?.categories} />
            </div>

            <div className="text-xs font-light">|</div>

            <div className="flex gap-2 items-center">
              <HashtagIcon />

              <span>{openQuiz?.question_count} Questions</span>
            </div>

            <div className="text-xs font-light">|</div>

            <div className="flex gap-2 items-center">
              <AlternativePointsIcon />

              <span>{openQuiz?.points} Points</span>
            </div>

            <div className="text-xs font-light">|</div>

            <div className="flex gap-2 items-center">
              <RocketIcon />

              <span>{openQuiz?.total_users} Plays</span>
            </div>

            <div className="text-xs font-light">|</div>

            <div className="flex gap-2 items-center">
              <TimeIcon />

              <span>{formatTime(openQuiz?.max_time, false)}</span>
            </div>
          </section>
        </div>

        <form
          className="flex gap-10"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="flex flex-col gap-12 w-full">
            {questions?.map((question, index) => (
              <Controller
                key={question.id}
                name={`answers.${question.id}`}
                control={control}
                render={({ field }) => (
                  <QuizQuestion
                    question={question}
                    index={index}
                    selectedAnswers={field.value}
                    setSelectedAnswers={field.onChange}
                  />
                )}
              />
            ))}
          </div>

          <div className="sticky top-28 w-100 h-full">
            <div className="relative flex flex-col items-center px-8 pb-9.5 text-gray-600 w-full border border-gray-200 rounded-lg">
              <h6 className="absolute -translate-y-1/2 font-semibold py-3 px-5 bg-white border rounded-lg border-gray-200 text-center">
                Timer
              </h6>

              <span className="text-6xl pt-10 pb-3 px-8 border-b border-gray-300">
                {timeLeft !== null ? formatSeconds(timeLeft) : "--:--"}
              </span>

              <button
                type="submit"
                className="bg-blue font-semibold rounded-xl py-3.5 px-32 mt-8 text-white transition hover:cursor-pointer hover:opacity-85"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>

      {(isLoading || isPending) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <SpinningWheelIcon
            className="size-37 animate-spin"
            strokeWidth={0.5}
          />
        </div>
      )}
    </div>
  );
}

export default QuizSubmitPage;
