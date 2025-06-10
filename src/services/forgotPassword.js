import { axiosInstance } from "./";

async function forgotPassword(formData) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/api/forgot-password", formData);

  return response;
}

export default forgotPassword;
