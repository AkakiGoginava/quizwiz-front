import { axiosInstance } from "./";

async function verifyEmail({ id, hash }) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/api/email/verify", { id, hash });

  return response;
}

export default verifyEmail;
