import { axiosInstance } from "@/services";

async function fetchSocials() {
  const response = await axiosInstance.get("/api/socials");

  return response.data;
}

export default fetchSocials;
