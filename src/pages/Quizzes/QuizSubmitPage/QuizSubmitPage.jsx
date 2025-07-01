import React, { useRef } from "react";

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
import { formatTime, formatSeconds } from "@/helper";

import { QuizQuestion, QuizSubmitHeader, ResultModal } from "./components";
import { useQuizSubmitPage } from "./useQuizSubmitPage";

function QuizSubmitPage() {
  const {
    control,
    handleSubmit,
    onSubmit,
    timeLeft,
    isLoadingQuiz,
    openQuiz,
    questions,
    isPendingStart,
    isSuccessStart,
    isPendingEnd,
    resultPoints,
    resultTime,
    resultModalOpen,
    markedCount,
  } = useQuizSubmitPage();

  const formRef = useRef(null);

  if (isLoadingQuiz || isPendingStart) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
        <SpinningWheelIcon className="size-37 animate-spin" strokeWidth={0.5} />
      </div>
    );
  }

  if (!isSuccessStart) return <div>Could not start quiz</div>;

  const quizInfoItems = [
    {
      icon: <PinIcon className="min-h-5 min-w-5" />,
      content: <DotList textColor="#667085" items={openQuiz?.categories} />,
    },
    {
      icon: <HashtagIcon className="min-h-5 min-w-5" />,
      content: <span>{openQuiz?.question_count} Questions</span>,
    },
    {
      icon: <AlternativePointsIcon className="min-h-5 min-w-5" />,
      content: <span>{openQuiz?.points} Points</span>,
    },
    {
      icon: <RocketIcon className="min-h-5 min-w-5" />,
      content: <span>{openQuiz?.total_users} Plays</span>,
    },
    {
      icon: <TimeIcon className="min-h-5 min-w-5" />,
      content: <span>{formatTime(openQuiz?.max_time, false)}</span>,
    },
  ];

  return (
    <div className="size-full">
      <ResultModal
        quiz={openQuiz}
        resultTime={resultTime}
        resultPoints={resultPoints}
        isOpen={resultModalOpen}
        isPendingEnd={isPendingEnd}
      />

      <QuizSubmitHeader
        quiz={openQuiz}
        isLoading={isLoadingQuiz}
        timeLeft={timeLeft}
        onSubmit={handleSubmit(onSubmit)}
        markedCount={markedCount}
      />

      <section className="flex flex-col gap-23.5 py-15 px-4.5 md:px-25 mt-30 md:mt-18">
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-center text-wrap font-bold text-4.5xl">
            {openQuiz?.title}
          </h1>

          <section className="flex gap-4 flex-wrap justify-center items-center px-4 md:px-0 font-semibold text-sm text-gray-500">
            {quizInfoItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex gap-2 items-center">
                  {item.icon}
                  {item.content}
                </div>
                {idx < quizInfoItems.length - 1 && (
                  <div className="text-xs font-light">|</div>
                )}
              </React.Fragment>
            ))}
          </section>
        </div>

        <form
          ref={formRef}
          className="flex gap-10"
          onSubmit={handleSubmit(onSubmit)}
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

          <div className="hidden md:block sticky top-28 w-100 h-full">
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
    </div>
  );
}

export default QuizSubmitPage;
