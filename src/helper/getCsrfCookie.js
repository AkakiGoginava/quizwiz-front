import { axiosInstance } from "@/services";

async function getCsrfCookie() {
  try {
    await axiosInstance.get("/sanctum/csrf-cookie");
  } catch (error) {
    console.error("Failed to fetch CSRF cookie:", error);
    throw error;
  }
}

export default getCsrfCookie;
