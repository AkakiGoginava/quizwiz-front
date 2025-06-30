import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function verifyEmail({ token }) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/email/verify", {
    token,
  });

  return response;
}

export default verifyEmail;
