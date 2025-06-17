import { useQuery } from "@tanstack/react-query";
import { fetchDifficulties } from "@/services";

function useDifficulties() {
  return useQuery({
    queryKey: ["difficulties"],
    queryFn: fetchDifficulties,
    select: (response) => response.data,
  });
}

export default useDifficulties;
