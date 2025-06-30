import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function checkEmailVerifyToken({ token }) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/email/check-verify-token", {
    token,
  });

  return response;
}

export default checkEmailVerifyToken;
