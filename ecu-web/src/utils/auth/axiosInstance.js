import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add access token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 (Unauthorized) and retry flag is not set
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Request new access token using the refresh token
          const { data } = await axiosInstance.post("/refresh-token", {
            token: refreshToken,
          });

          // Update tokens in localStorage
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Update authorization header for the original request
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;

          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (err) {
          // Handle token refresh failure (e.g., logout user)
          console.error("Refresh token expired or invalid", err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
