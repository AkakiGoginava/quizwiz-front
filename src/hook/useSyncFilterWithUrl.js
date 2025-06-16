import { useEffect } from "react";

const useSyncFilterWithUrl = (searchParams, setFilterState) => {
  useEffect(() => {
    const title = searchParams.get("title");
    const sort = searchParams.get("sort");
    const completed = searchParams.get("completed");
    const categories = searchParams.get("categories");
    const difficulties = searchParams.get("difficulties");

    const newState = {
      titleSearch: title ?? "",
      sortType: sort ?? "",
      completedFilter: completed ?? "",
      categoryFilter: categories ? categories.split(",") : [],
      difficultyFilter: difficulties ? difficulties.split(",") : [],
    };

    setFilterState((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newState)) return prev;
      return newState;
    });
  }, [searchParams]);
};

export default useSyncFilterWithUrl;
