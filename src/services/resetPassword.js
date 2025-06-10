import { axiosInstance } from "./";

async function resetPassword(formData) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/api/reset-password", formData);

  return response;
}

export default resetPassword;
