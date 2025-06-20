import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function startQuiz(id) {
  await getCsrfCookie();

  const response = await axiosInstance.post(`/api/quizzes/${id}/start`);

  return response.data;
}

export default startQuiz;
