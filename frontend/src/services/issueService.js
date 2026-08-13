import axiosInstance from "../api/axiosInstance";


// ==========================================
// GET ALL ISSUES
// ==========================================

export const getIssues = async () => {
  const response =
    await axiosInstance.get(
      "/issues"
    );

  return response.data;
};


// ==========================================
// GET SINGLE ISSUE
// ==========================================

export const getIssue = async (id) => {
  const response =
    await axiosInstance.get(
      `/issues/${id}`
    );

  return response.data;
};


// ==========================================
// CREATE ISSUE
// ==========================================

export const createIssue = async (
  issueData
) => {
  const response =
    await axiosInstance.post(
      "/issues",
      issueData
    );

  return response.data;
};


// ==========================================
// UPDATE ISSUE STATUS
// ==========================================

export const updateIssueStatus =
  async (
    issueId,
    status
  ) => {
    const response =
      await axiosInstance.patch(
        `/issues/${issueId}`,
        {
          status,
        }
      );

    return response.data;
  };


// ==========================================
// UPDATE ISSUE
// ==========================================

export const updateIssue = async (
  id,
  issueData
) => {
  const response =
    await axiosInstance.put(
      `/issues/${id}`,
      issueData
    );

  return response.data;
};


// ==========================================
// DELETE ISSUE
// ==========================================

export const deleteIssue = async (
  id
) => {
  const response =
    await axiosInstance.delete(
      `/issues/${id}`
    );

  return response.data;
};