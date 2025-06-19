import { useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "@/services";
import { useAuth } from "@/hook";

export const useQuizListing = () => {
  const { userQuizzes } = useAuth();

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
  } = useInfiniteQuery({
    queryKey: ["quizzes", filterState],
    queryFn: ({ pageParam = 0 }) => fetchQuizzes({ pageParam, ...filterState }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.meta?.next_cursor,
  });

  return {
    filterState,
    setFilterState,
    quizzes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoadingQuizzes,
    userQuizzes,
  };
};
