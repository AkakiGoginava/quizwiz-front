import { axiosInstance } from ".";

async function fetchQuizzes({ pageParam }) {
  const response = await axiosInstance.get(`/api/quizzes?cursor=${pageParam}`);
  return response.data;
}

export default fetchQuizzes;
