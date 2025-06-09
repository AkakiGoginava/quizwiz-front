import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://api.local.test:8000",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axiosInstance;
