import { useEffect } from "react";

const useUpdateUrlQuery = function (
  filterState,
  searchParams,
  setSearchParams
) {
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const mapping = {
      title: filterState.titleSearch,
      sort: filterState.sortType,
      completed: filterState.completedFilter,
      categories: filterState.categoryFilter.length
        ? filterState.categoryFilter.join(",")
        : "",
      difficulties: filterState.difficultyFilter.length
        ? filterState.difficultyFilter.join(",")
        : "",
    };

    Object.entries(mapping).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (params.toString() === searchParams.toString()) return;

    setSearchParams(params, { replace: true });
  }, [filterState]);
};

export default useUpdateUrlQuery;
