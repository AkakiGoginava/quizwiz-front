import { axiosInstance } from "@/services";

async function checkUniqueInput(field, value) {
  const response = await axiosInstance.get("/api/check-unique", {
    params: { field, value },
  });

  return response;
}

export default checkUniqueInput;
