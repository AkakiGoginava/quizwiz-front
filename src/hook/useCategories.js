import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services";

function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    select: (response) => response.data,
  });
}

export default useCategories;
