import axiosInstance from "../auth/axiosInstance";

export const getData = async (urlExtension) => {
  try {
    const response = await axiosInstance.get(urlExtension);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
