import { axiosInstance } from "@/services";

async function fetchCategories() {
  const response = await axiosInstance.get("/api/categories");

  return response;
}

export default fetchCategories;
