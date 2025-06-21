import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function endQuiz(quizId, attemptId, answers) {
  await getCsrfCookie();

  const response = await axiosInstance.post(`/api/quizzes/${quizId}/end`, {
    attempt_id: attemptId,
    answers,
  });

  return response.data;
}

export default endQuiz;
