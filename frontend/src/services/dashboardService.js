import axios from "axios";

const API_URL =
  "https://urbanmind-backend-ix55.onrender.com/api/dashboard";

export const getDashboardStats = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};