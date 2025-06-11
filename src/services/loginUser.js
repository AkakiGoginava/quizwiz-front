import { axiosInstance } from "./";
import { getCsrfCookie } from "@/helper";

async function loginUser(formData) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/login", formData);

  return response;
}

export default loginUser;
