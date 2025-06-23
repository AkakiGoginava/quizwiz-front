import React from "react";

import { Link } from "react-router-dom";

import {
  AlternativePointsIcon,
  ArrowIcon,
  DotList,
  HashtagIcon,
  QuizCard,
  RocketIcon,
  TimeIcon,
} from "@/components";
import { formatTime } from "@/helper";
import { useQuizPage } from "./useQuizPage";

function QuizPage() {
  const { navigate, userQuizzes, isLoading, openQuiz, similarQuizzes } =
    useQuizPage();

  if (!openQuiz)
    return <div className="size-full text-center">Quiz not found.</div>;
  if (isLoading) return <div className="size-full text-center">Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-6 px-24 pt-6 pb-20">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="flex gap-2 font-medium text-gray-500 items-center hover:cursor-pointer hover:opacity-85"
        >
          <ArrowIcon />
          Back
        </button>

        <div className="flex gap-10">
          <section className="flex flex-col gap-8">
            <div className="flex pb-12 gap-8 border-b border-gray-200">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-4.5xl">{openQuiz.title}</h1>

                <DotList items={openQuiz.categories} />

                <p className="font-semibold text-gray-500 text-sm mb-8">
                  {openQuiz.description}
                </p>

                <div className="flex gap-3 text-sm items-center font-semibold text-gray-500 mb-10">
                  <div className="flex gap-2 items-center">
                    <HashtagIcon />

                    <span>{openQuiz.question_count} Questions</span>
                  </div>

                  <div className="text-xs font-light">|</div>

                  <div className="flex gap-2 items-center">
                    <AlternativePointsIcon />

                    <span>{openQuiz.points} Points</span>
                  </div>

                  <div className="text-xs font-light">|</div>

                  <div className="flex gap-2 items-center">
                    <RocketIcon />

                    <span>{openQuiz.total_users} Plays</span>
                  </div>

                  <div className="text-xs font-light">|</div>

                  <div className="flex gap-2 items-center">
                    <TimeIcon />

                    <span>{formatTime(openQuiz.max_time, false)}</span>
                  </div>
                </div>

                {!userQuizzes[openQuiz.id] && (
                  <Link
                    to={`/quizzes/${openQuiz.id}/submit`}
                    className="font-semibold text-white bg-blue rounded-xl py-3 px-31 mr-auto transition hover:cursor-pointer hover:opacity-85"
                  >
                    Start Quiz
                  </Link>
                )}
              </div>

              <img
                src={openQuiz.image}
                className="w-82 h-77 rounded-2xl object-cover"
                alt="quiz image"
              />
            </div>

            <div className="pt-8">
              <h3 className="font-bold text-lg mb-3">Instructions</h3>

              <p>{openQuiz.instructions}</p>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            {similarQuizzes?.map((quiz) => (
              <div key={quiz.id} className="border border-gray-200 rounded-xl">
                <QuizCard
                  id={quiz.id}
                  title={quiz.title}
                  totalUsers={quiz.total_users}
                  difficulty={quiz.difficulty}
                  image={quiz.image}
                  categories={quiz.categories}
                />
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
