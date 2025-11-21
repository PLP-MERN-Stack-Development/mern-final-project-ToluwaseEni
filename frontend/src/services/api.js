// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-final-project-toluwaseeni-1.onrender.com/api",
  withCredentials: true, // allows cookies / auth headers to pass
});

// Attach token from localStorage
API.interceptors.request.use((config) => {
  // CHECK ALL POSSIBLE TOKEN KEYS
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("designerToken") ||
    localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
