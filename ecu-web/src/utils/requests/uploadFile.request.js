import axiosInstance from "../auth/axiosInstance";

export const uploadFile = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};
