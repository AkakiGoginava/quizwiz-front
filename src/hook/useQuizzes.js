import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "@/services";

function useQuizzes() {
  return useInfiniteQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage["next_cursor"],
  });
}

export default useQuizzes;
