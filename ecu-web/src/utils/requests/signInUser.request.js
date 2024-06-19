import axiosInstance from "../auth/axiosInstance";

export const signInUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/sign-in", credentials);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
      })
    );
    return response.data;
  } catch (error) {
    console.error("Sign-In error:", error);
    throw error;
  }
};
