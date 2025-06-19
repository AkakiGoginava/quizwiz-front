import { axiosInstance } from "@/services";

async function fetchQuiz(id) {
  const response = await axiosInstance.get(`/api/quizzes/${id}`);

  return response;
}

export default fetchQuiz;
