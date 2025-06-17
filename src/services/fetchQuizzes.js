import { axiosInstance } from "@/services";

async function fetchQuizzes({
  pageParam = 0,
  sortType = "",
  titleSearch = "",
  completedFilter = "",
  categoryFilter = [],
  difficultyFilter = [],
}) {
  const params = {
    cursor: pageParam,
    ...(sortType && {
      sort: sortType,
    }),
    ...(titleSearch && {
      "filter[title]": titleSearch,
    }),
    ...(completedFilter && {
      "filter[completed]": completedFilter,
    }),
    ...(categoryFilter.length > 0 && {
      "filter[categories.id]": categoryFilter.join(","),
    }),
    ...(difficultyFilter.length > 0 && {
      "filter[difficulty_id]": difficultyFilter.join(","),
    }),
  };

  const response = await axiosInstance.get("/api/quizzes", { params });

  return response.data;
}

export default fetchQuizzes;
