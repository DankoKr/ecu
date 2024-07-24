import axiosInstance from "../auth/axiosInstance";

export const getUserByFederation = async (federation) => {
  try {
    const response = await axiosInstance.get(`/users/federation/${federation}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
