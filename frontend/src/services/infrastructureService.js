import axiosInstance from "../api/axiosInstance";

export const getInfrastructure = async () => {
  const response =
    await axiosInstance.get(
      "/infrastructure"
    );

  return response.data;
};


export const createInfrastructure = async (
  infrastructureData
) => {
  const response =
    await axiosInstance.post(
      "/infrastructure",
      infrastructureData
    );

  return response.data;
};


export const updateInfrastructure = async (
  id,
  infrastructureData
) => {
  const response =
    await axiosInstance.put(
      `/infrastructure/${id}`,
      infrastructureData
    );

  return response.data;
};


export const deleteInfrastructure = async (
  id
) => {
  const response =
    await axiosInstance.delete(
      `/infrastructure/${id}`
    );

  return response.data;
};