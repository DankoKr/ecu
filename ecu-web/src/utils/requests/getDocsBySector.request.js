import axiosInstance from "../auth/axiosInstance";

export const getDocsBySector = async (sectorName) => {
  try {
    const response = await axiosInstance.get(`/files/sector/${sectorName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};
