import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "@/services";

function useQuizzes() {
  return useInfiniteQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["next_cursor"],
    staleTime: 5 * 60 * 1000,
  });
}

export default useQuizzes;
