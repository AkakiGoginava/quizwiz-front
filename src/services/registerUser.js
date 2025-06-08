import { axiosInstance } from "./";

async function registerUser(formData) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/api/register", formData);

  return response;
}

export default registerUser;
