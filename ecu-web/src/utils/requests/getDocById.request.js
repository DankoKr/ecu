import axiosInstance from "../auth/axiosInstance";

export const getDocById = async (fileId) => {
  try {
    const response = await axiosInstance.get(`/files/${fileId}`, {
      responseType: "blob", // Set responseType to 'blob' for binary data
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};
