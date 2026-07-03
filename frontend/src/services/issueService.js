import axios from "axios";

const API_URL =
  "http://localhost:5000/api/issues";

// ==============================
// GET ALL ISSUES
// ==============================

export const getIssues = async (
  token
) => {

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

// ==============================
// CREATE ISSUE
// ==============================

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

// ==============================
// UPDATE ISSUE STATUS
// ==============================

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

// ==============================
// UPDATE ISSUE
// ==============================

export const updateIssue =
  async (
    id,
    issueData,
    token
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
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

// ==============================
// DELETE ISSUE
// ==============================

export const deleteIssue =
  async (
    id,
    token
  ) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;

  };