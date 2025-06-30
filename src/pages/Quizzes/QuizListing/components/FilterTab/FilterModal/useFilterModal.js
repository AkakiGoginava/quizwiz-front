import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hook";
import { fetchDifficulties } from "@/services";

export const useFilterModal = (filterState) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { ...filterState },
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const [filterSearch, setFilterSearch] = useState("");
  const [activeTab, setActiveTab] = useState("filter");

  const { data: difficulties, isLoading: isLoadingDifficulties } = useQuery({
    queryKey: ["difficulties"],
    queryFn: fetchDifficulties,
    select: (response) => response.data,
  });

  useEffect(() => {
    reset({ ...filterState });
  }, [filterState, reset]);

  const handleReset = () => {
    reset({
      titleSearch: "",
      sortType: "",
      completedFilter: "",
      difficultyFilter: [],
      categoryFilter: [],
    });
  };

  const sortType = watch("sortType");
  const completedFilter = watch("completedFilter");
  const difficultyFilter = watch("difficultyFilter");
  const categoryFilter = watch("categoryFilter");

  const isEmpty =
    !sortType &&
    !completedFilter &&
    difficultyFilter.length === 0 &&
    categoryFilter.length === 0;

  const isChanged =
    sortType !== filterState.sortType ||
    completedFilter !== filterState.completedFilter ||
    JSON.stringify(difficultyFilter) !==
      JSON.stringify(filterState.difficultyFilter) ||
    JSON.stringify(categoryFilter) !==
      JSON.stringify(filterState.categoryFilter);

  return {
    control,
    handleSubmit,
    reset,
    user,
    navigate,
    difficulties,
    isLoadingDifficulties,
    handleReset,
    isEmpty,
    isChanged,
    filterSearch,
    setFilterSearch,
    activeTab,
    setActiveTab,
  };
};
