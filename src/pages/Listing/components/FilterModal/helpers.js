export const onSubmit = function (setIsOpen, navigate, data) {
  const params = new URLSearchParams();
  if (data.titleSearch) params.set("title", data.titleSearch);
  if (data.completedFilter) params.set("completed", data.completedFilter);
  if (data.sortType) params.set("sort", data.sortType);
  if (data.difficultyFilter && data.difficultyFilter.length > 0)
    params.set("difficulties", data.difficultyFilter.join(","));
  if (data.categoryFilter && data.categoryFilter.length > 0)
    params.set("categories", data.categoryFilter.join(","));

  navigate(`/quizzes?${params.toString()}`);
  setIsOpen(false);
};
