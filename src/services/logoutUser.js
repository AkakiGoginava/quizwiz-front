import { axiosInstance } from "./";

async function logoutUser() {
  const response = await axiosInstance.post("/api/logout");

  return response;
}

export default logoutUser;
