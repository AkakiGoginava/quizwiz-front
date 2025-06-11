import { axiosInstance } from "./";
import { getCsrfCookie } from "@/helper";

async function verifyEmail({ id, hash }) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/email/verify", { id, hash });

  return response;
}

export default verifyEmail;
