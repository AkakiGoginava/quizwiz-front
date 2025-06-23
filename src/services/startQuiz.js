import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function startQuiz(quizId) {
  await getCsrfCookie();

  const response = await axiosInstance.post(`/api/quizzes/${quizId}/start`);

  return response.data;
}

export default startQuiz;
