import axiosInstance from "./axios.js";

async function registerUser(formData) {
  await axiosInstance.get("/sanctum/csrf-cookie");

  const response = await axiosInstance.post("/register", formData);

  return response;
}

export default registerUser;
