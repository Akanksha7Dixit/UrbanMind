import axios from "axios";

const API_URL =
  "http://localhost:5000/api/infrastructure";

export const getInfrastructure = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createInfrastructure = async (
  infrastructureData,
  token
) => {
  const response = await axios.post(
    API_URL,
    infrastructureData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateInfrastructure = async (
  id,
  infrastructureData,
  token
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    infrastructureData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteInfrastructure = async (
  id,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};