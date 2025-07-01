import { fetchLandingInfo } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useLanding = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["landingInfo"],
    queryFn: fetchLandingInfo,
  });

  const { quizzes_count = 0, category_count = 0 } = data || {};

  return {
    quizCount: quizzes_count,
    categoryCount: category_count,
    isLoading,
  };
};
