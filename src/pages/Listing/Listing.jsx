import React from "react";
import { ArrowDownIcon, SpinningWheelIcon } from "@/assets";
import { useQuizzes, useDifficulties } from "@/hook";
import { FilterTab, QuizCard } from "./components";

function Listing() {
  const {
    data: quizzes,
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
    isLoading: isLoadingQuizzes,
  } = useQuizzes();

  const { data: difficulties, isLoading: isLoadingDifficulties } =
    useDifficulties();

  if (isLoadingQuizzes || isLoadingDifficulties) {
    return <div className="text-center size-full">Loading...</div>;
  }

  return (
    <div className="px-23 size-full mb-17.5">
      <FilterTab />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] gap-y-8 mt-10">
        {difficulties &&
          quizzes?.pages.map((page) =>
            page.data.map((quiz) => (
              <QuizCard
                key={quiz.id}
                title={quiz.title}
                totalUsers={quiz.total_users}
                difficulty={quiz.difficulty}
                image={quiz.image}
                categories={quiz.categories}
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
                <p>Loading..</p>
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
