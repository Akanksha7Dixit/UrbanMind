import axios from "axios";

const API_URL =
  "https://urbanmind-backend-ix55.onrender.com/api/analytics";

export const getAnalytics =
  async (token) => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

  };