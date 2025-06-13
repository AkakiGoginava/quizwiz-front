import { axiosInstance } from ".";

async function fetchDifficulties() {
  const response = await axiosInstance.get("/api/difficulties");

  return response;
}

export default fetchDifficulties;
