import { axiosInstance } from ".";

async function fetchQuizzes({
  pageParam = 0,
  categoryFilter = [],
  titleSearch = "",
}) {
  const params = {
    cursor: pageParam,
    ...(categoryFilter.length > 0 && {
      "filter[categories.id]": categoryFilter.join(","),
    }),
    ...(titleSearch && {
      "filter[title]": titleSearch,
    }),
  };

  const response = await axiosInstance.get("/api/quizzes", { params });

  return response.data;
}

export default fetchQuizzes;
