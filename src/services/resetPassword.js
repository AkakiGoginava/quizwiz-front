import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function resetPassword(formData) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/reset-password", formData);

  return response;
}

export default resetPassword;
