import axiosInstance from "../auth/axiosInstance";

export const putData = async (url, newData, id) => {
  try {
    await axiosInstance.put(`${url}/${id}`, newData);
  } catch (error) {
    console.error("Data upload error:", error);
    throw error;
  }
};
