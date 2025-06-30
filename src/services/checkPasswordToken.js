import { axiosInstance } from "@/services";
import { getCsrfCookie } from "@/helper";

async function checkPasswordToken(token, email) {
  await getCsrfCookie();

  const response = await axiosInstance.post("/api/check-password-token", {
    token,
    email,
  });

  return response;
}

export default checkPasswordToken;
