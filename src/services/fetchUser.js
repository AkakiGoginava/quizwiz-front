import { axiosInstance } from "./";

async function fetchUser() {
  const response = await axiosInstance.get("/api/user");

  return response;
}

export default fetchUser;
