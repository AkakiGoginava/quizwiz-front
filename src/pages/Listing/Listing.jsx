import React from "react";
import { ArrowDownIcon, FilterIcon, SpinningWheelIcon } from "@/assets";
import { useQuizzes, useDifficulties, useCategories } from "@/hook";
import { Carousel, QuizCard } from "./components";

function Listing() {
  const {
    data: quizzes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingQuizzes,
  } = useQuizzes();
  const { data: difficulties, isLoadingDifficulties } = useDifficulties();
  const { data: categories, isLoadingCategories } = useCategories();

  if (
    isLoadingQuizzes ||
    isLoadingDifficulties ||
    isLoadingCategories ||
    !quizzes ||
    !difficulties ||
    !categories
  ) {
    return <div></div>;
  }

  const getCategoryNamesByIds = (ids) => {
    if (!categories) return [];
    return categories
      .filter((cat) => ids.includes(cat.id))
      .map((cat) => cat.name);
  };

  return (
    <div className="px-23 size-full mb-17.5">
      <div className="flex gap-6 mt-6 w-full justify-between">
        <Carousel categories={categories} />
        <button
          type="button"
          className="flex gap-1.5 items-center mb-4 py-2 px-4 border border-gray-400 rounded-xl text-gray-500 font-light text-sm"
        >
          <FilterIcon className="size-3.5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] gap-y-8 mt-10">
        {quizzes.pages.map((page) =>
          page.data.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              totalUsers={quiz.total_users}
              difficulty={difficulties[quiz.difficulty - 1]}
              image={quiz.image}
              categories={getCategoryNamesByIds(quiz.categories)}
            />
          ))
        )}
      </div>

      <div className="flex justify-center mt-10">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="flex items-center gap-2 text-blue font-semibold hover:cursor-pointer hover:opacity-80"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <SpinningWheelIcon className="size-5 animate-spin" />
                <p>Load more</p>
              </>
            ) : (
              <>
                <ArrowDownIcon className="size-5" />
                <p>Load more</p>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Listing;
