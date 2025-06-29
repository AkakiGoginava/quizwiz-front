import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 500) {
      window.location.href = "/server-error";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
