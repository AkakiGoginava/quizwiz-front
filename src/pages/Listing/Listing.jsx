import React, { useState } from "react";
import { ArrowDownIcon, SpinningWheelIcon } from "@/assets";
import { useQuizzes } from "@/hook";
import { FilterTab, QuizCard } from "./components";

function Listing() {
  const [filterState, setFilterState] = useState({
    titleSearch: "",
    sortType: "",
    completedFilter: "",
    categoryFilter: [],
    difficultyFilter: [],
  });

  const {
    data: quizzes,
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
    isLoading: isLoadingQuizzes,
  } = useQuizzes(filterState);

  return (
    <div className="px-23 size-full mb-17.5">
      <FilterTab filterState={filterState} setFilterState={setFilterState} />

      <section className="relative grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] gap-y-8 mt-10">
        {quizzes?.pages.map((page) =>
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

        {isLoadingQuizzes && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70"></div>
        )}
      </section>

      <div className="flex justify-center mt-10">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="flex items-center gap-2 text-blue font-semibold hover:cursor-pointer hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isFetchingNextPage || isLoadingQuizzes}
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
