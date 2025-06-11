import { axiosInstance } from "./";
import { getCsrfCookie } from "@/helper";

async function forgotPassword(formData) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/forgot-password", formData);

  return response;
}

export default forgotPassword;
