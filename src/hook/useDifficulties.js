import { useQuery } from "@tanstack/react-query";
import { fetchDifficulties } from "@/services";

function useDifficulties() {
  return useQuery({
    queryKey: ["difficulties"],
    queryFn: fetchDifficulties,
    staleTime: 5 * 60 * 1000,
    select: (response) => response.data,
  });
}

export default useDifficulties;
