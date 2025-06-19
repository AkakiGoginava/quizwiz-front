import { useAuth } from "@/hook";
import { fetchQuiz } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const useQuizPage = () => {
  const navigate = useNavigate();
  const { id: openQuizId } = useParams();
  const { userQuizzes } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["quiz", openQuizId],
    queryFn: () => fetchQuiz(openQuizId),
    enabled: !!openQuizId,
  });

  const openQuiz = data?.data;
  const similarQuizzes = data?.similar_quizzes;

  return {
    navigate,
    userQuizzes,
    isLoading,
    openQuiz,
    similarQuizzes,
  };
};
