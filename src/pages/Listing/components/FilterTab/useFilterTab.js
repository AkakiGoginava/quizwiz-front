import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "@/services";

export const useFilterTab = (filterState, setFilterState) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    setSearchParams(params, { replace: true });
  }, [filterState]);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (response) => response.data,
  });

  return {
    categories,
    isLoadingCategories,
    isModalOpen,
    setIsModalOpen,
    searchParams,
    setSearchParams,
  };
};
