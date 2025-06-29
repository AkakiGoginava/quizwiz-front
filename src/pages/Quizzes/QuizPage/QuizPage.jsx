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
import { NotFound } from "@/pages";

function QuizPage() {
  const { navigate, userQuizzes, isLoading, openQuiz, similarQuizzes } =
    useQuizPage();

  if (!openQuiz) return <NotFound />;
  if (isLoading) return <div className="size-full text-center">Loading...</div>;

  return (
    <>
      <div className="flex flex-col gap-6 px-4.5 md:px-24 pt-6 pb-20">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="hidden md:flex gap-2 font-medium text-gray-500 items-center hover:cursor-pointer hover:opacity-85"
        >
          <ArrowIcon />
          Back
        </button>

        <div className="flex gap-10">
          <section className="flex flex-col gap-8">
            <div className="flex pb-12 gap-8 border-b border-gray-200">
              <div className="flex flex-col gap-4 text-nowrap">
                <div className="flex flex-col-reverse md:flex-col gap-4">
                  <h1 className="font-bold text-4.5xl text-wrap">
                    {openQuiz.title}
                  </h1>

                  <DotList items={openQuiz.categories} />
                </div>

                <p className="font-semibold text-gray-500 text-sm mb-8 text-wrap">
                  {openQuiz.description}
                </p>

                <img
                  src={openQuiz.image}
                  className="md:hidden w-full h-68.5 rounded-2xl object-cover"
                  alt="quiz image"
                />

                <div className="flex flex-col md:flex-row gap-6 md:gap-3 text-sm items-start md:items-center font-semibold text-gray-500 mb-6 md:mb-10">
                  <div className="flex gap-2 items-center">
                    <HashtagIcon />

                    <span>{openQuiz.question_count} Questions</span>
                  </div>

                  <div className="text-xs font-light hidden md:block">|</div>

                  <div className="flex gap-2 items-center">
                    <AlternativePointsIcon />

                    <span>{openQuiz.points} Points</span>
                  </div>

                  <div className="text-xs font-light hidden md:block">|</div>

                  <div className="flex gap-2 items-center">
                    <RocketIcon />

                    <span>{openQuiz.total_users} Plays</span>
                  </div>

                  <div className="text-xs font-light hidden md:block">|</div>

                  <div className="flex gap-2 items-center">
                    <TimeIcon />

                    <span>{formatTime(openQuiz.max_time, false)}</span>
                  </div>
                </div>

                {!userQuizzes[openQuiz.id] && (
                  <Link
                    to={`/quizzes/${openQuiz.id}/submit`}
                    className="text-center w-full md:w-auto font-semibold text-white bg-blue rounded-xl py-3 px-31 mr-auto transition hover:cursor-pointer hover:opacity-85"
                  >
                    Start Quiz
                  </Link>
                )}
              </div>

              <img
                src={openQuiz.image}
                className="hidden md:block w-82 h-77 rounded-2xl object-cover"
                alt="quiz image"
              />
            </div>

            <div className="md:pt-8">
              <h3 className="font-bold text-lg mb-3">Instructions</h3>

              <p>{openQuiz.instructions}</p>
            </div>
          </section>

          <section className="hidden md:flex flex-col gap-8">
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
