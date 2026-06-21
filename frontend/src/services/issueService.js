import axios from "axios";

const API_URL =
  "http://localhost:5000/api/issues";

export const getIssues = async (
  token
) => {
  const response =
    await axios.get(API_URL, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });

  return response.data;
};

export const createIssue =
  async (
    issueData,
    token
  ) => {
    const response =
      await axios.post(
        API_URL,
        issueData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  export const updateIssueStatus =
  async (
    issueId,
    status,
    token
  ) => {

    const response =
      await axios.patch(
        `${API_URL}/${issueId}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };