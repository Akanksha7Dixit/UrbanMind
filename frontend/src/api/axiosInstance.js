
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://urbanmind-backend-ix55.onrender.com/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const auth = JSON.parse(
        localStorage.getItem("urbanmind-auth") || "null"
      );

      const token = auth?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Unable to read authentication token:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
