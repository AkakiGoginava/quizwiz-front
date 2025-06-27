import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function checkEmailVerifyToken(email) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/email/check-verify-token", {
    email,
  });

  return response;
}

export default checkEmailVerifyToken;
