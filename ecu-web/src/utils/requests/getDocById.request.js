import axiosInstance from "../auth/axiosInstance";

export const getDocById = async (fileId) => {
  try {
    const response = await axiosInstance.get(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
