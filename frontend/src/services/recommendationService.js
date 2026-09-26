import axiosInstance from "../api/axiosInstance";

let recommendationsRequest = null;
let recommendationsCache = null;

const CACHE_TTL = 30 * 1000;

export const getRecommendations = async (
  token,
  { forceRefresh = false } = {}
) => {
  if (!token) {
    throw new Error("Authentication token is not available.");
  }

  const now = Date.now();

  if (
    !forceRefresh &&
    recommendationsCache &&
    recommendationsCache.token === token &&
    now - recommendationsCache.timestamp < CACHE_TTL
  ) {
    return recommendationsCache.data;
  }

  if (!forceRefresh && recommendationsRequest) {
    return recommendationsRequest;
  }

  recommendationsRequest = axiosInstance
    .get("/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = response.data;

      recommendationsCache = {
        token,
        data,
        timestamp: Date.now(),
      };

      return data;
    })
    .finally(() => {
      recommendationsRequest = null;
    });

  return recommendationsRequest;
};

export const clearRecommendationsCache = () => {
  recommendationsCache = null;
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