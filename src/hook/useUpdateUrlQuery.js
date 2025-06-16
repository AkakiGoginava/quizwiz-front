import { useEffect } from "react";

const useUpdateUrlQuery = function (
  filterState,
  searchParams,
  setSearchParams
) {
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (filterState.titleSearch) {
      params.set("title", filterState.titleSearch);
    } else {
      params.delete("title");
    }

    if (filterState.sortType) {
      params.set("sort", filterState.sortType);
    } else {
      params.delete("sort");
    }

    if (filterState.completedFilter) {
      params.set("completed", filterState.completedFilter);
    } else {
      params.delete("completed");
    }

    if (filterState.categoryFilter.length > 0) {
      params.set("categories", filterState.categoryFilter.join(","));
    } else {
      params.delete("categories");
    }

    if (filterState.difficultyFilter.length > 0) {
      params.set("difficulties", filterState.difficultyFilter.join(","));
    } else {
      params.delete("difficulties");
    }

    if (params.toString() === searchParams.toString()) return;

    setSearchParams(params, { replace: true });
  }, [filterState]);
};

export default useUpdateUrlQuery;
