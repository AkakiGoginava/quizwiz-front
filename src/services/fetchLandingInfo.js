import { axiosInstance } from "@/services";

async function fetchLandingInfo() {
  const response = await axiosInstance.get("/api/landing-info");

  return response.data;
}

export default fetchLandingInfo;
