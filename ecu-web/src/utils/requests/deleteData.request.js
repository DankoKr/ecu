import axiosInstance from "../auth/axiosInstance";

export const deleteData = async (dataId, url) => {
  try {
    const response = await axiosInstance.delete(`${url}/${dataId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
