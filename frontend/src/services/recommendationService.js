import axiosInstance from "../api/axiosInstance";

export const getRecommendations = async (token) => {
  const response = await axiosInstance.get(
    "/recommendations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const askAI = async (
  token,
  message,
  history = []
) => {
  const response = await axiosInstance.post(
    "/ai/chat",
    {
      message,
      history,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAIHealth = async (token) => {
  const response = await axiosInstance.get(
    "/ai/health",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};