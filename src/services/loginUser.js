import { axiosInstance } from "./";

async function loginUser(formData) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/api/login", formData);

  return response;
}

export default loginUser;
