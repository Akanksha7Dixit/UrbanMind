import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://urbanmind-backend-ix55.onrender.com/api",
});

export default axiosInstance;