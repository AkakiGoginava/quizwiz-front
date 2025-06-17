import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services";

function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (response) => response.data,
  });
}

export default useCategories;
