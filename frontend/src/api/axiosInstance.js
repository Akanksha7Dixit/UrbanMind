import axios from "axios";
import { useAuthStore } from "../store/authStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {

const auth=JSON.parse(

localStorage.getItem(

"urbanmind-auth"

)

);

const token=auth?.state?.token;

if(token){

config.headers.Authorization=

`Bearer ${token}`;

}

return config;
});

export default axiosInstance;