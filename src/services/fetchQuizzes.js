import { axiosInstance } from "@/services";

async function fetchQuizzes({
  pageParam = 0,
  perPage = 9,
  sortType = "",
  titleSearch = "",
  completedFilter = "",
  categoryFilter = [],
  difficultyFilter = [],
}) {
  const params = {
    cursor: pageParam,
    per_page: perPage,
    ...(sortType && {
      sort: sortType,
    }),
    ...(titleSearch && {
      "filter[title]": titleSearch,
    }),
    ...(completedFilter && {
      "filter[my_quizzes]": completedFilter,
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
