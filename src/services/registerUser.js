import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function registerUser(formData) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/register", formData);

  return response;
}

export default registerUser;
