import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/hook";
import { fetchDifficulties } from "@/services";

export const useFilterModal = (filterState) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...filterState },
  });
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return {
    control,
    handleSubmit,
    reset,
    user,
    navigate,
    difficulties,
    isLoadingDifficulties,
    handleReset,
  };
};
