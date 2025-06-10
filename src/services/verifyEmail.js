import { axiosInstance } from "./";

async function verifyEmail({ id, hash }) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/api/verify-email", { id, hash });

  return response;
}

export default verifyEmail;
