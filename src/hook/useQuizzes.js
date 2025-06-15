import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "@/services";

function useQuizzes(filterState) {
  return useInfiniteQuery({
    queryKey: ["quizzes", filterState],
    queryFn: ({ pageParam = 0 }) => fetchQuizzes({ pageParam, ...filterState }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["next_cursor"],
  });
}

export default useQuizzes;
