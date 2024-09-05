import axiosInstance from "../auth/axiosInstance";

export const postData = async (url, formData) => {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Data upload error:", error);
    throw error;
  }
};
