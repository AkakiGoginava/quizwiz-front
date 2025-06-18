export const onSubmit = (setIsOpen, navigate, data) => {
  const params = new URLSearchParams();

  const {
    titleSearch,
    completedFilter,
    sortType,
    difficultyFilter,
    categoryFilter,
  } = data;

  if (titleSearch) {
    params.set("title", titleSearch);
  }

  if (completedFilter) {
    params.set("completed", completedFilter);
  }

  if (sortType) {
    params.set("sort", sortType);
  }

  if (Array.isArray(difficultyFilter) && difficultyFilter.length > 0) {
    params.set("difficulties", difficultyFilter.join(","));
  }

  if (Array.isArray(categoryFilter) && categoryFilter.length > 0) {
    params.set("categories", categoryFilter.join(","));
  }

  navigate(`/quizzes?${params.toString()}`);
  setIsOpen(false);
};
