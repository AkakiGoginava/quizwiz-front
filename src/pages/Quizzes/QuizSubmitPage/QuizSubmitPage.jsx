import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  AlternativePointsIcon,
  CrossIcon,
  DotList,
  HashtagIcon,
  PinIcon,
  RocketIcon,
  SpinningWheelIcon,
  TimeIcon,
} from "@/components";
import { formatTime } from "@/helper";
import { fetchQuiz } from "@/services";
import { QuizQuestion } from "./components";

function QuizSubmitPage() {
  const { id: openQuizId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["quiz", openQuizId],
    queryFn: () => fetchQuiz(openQuizId),
    enabled: !!openQuizId,
  });

  const openQuiz = data?.data;
  const questions = openQuiz?.questions;

  return (
    <div className="size-full">
      <header className="flex px-24 py-6 w-full border-b border-gray-200">
        <CrossIcon className="ml-auto size-6 text-gray-800 transition hover:cursor-pointer hover:opacity-80" />
      </header>

      <section className="flex flex-col py-15 px-25">
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

        <div className="flex gap-10">
          <div className="flex flex-col gap-12 w-full">
            {questions?.map((question, index) => (
              <QuizQuestion
                key={question.id}
                question={question}
                index={index}
              />
            ))}
          </div>

          <div className="w-100 h-full"></div>
        </div>
      </section>

      {isLoading && (
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
