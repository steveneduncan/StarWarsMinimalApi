// src/config.js
// Centralized API base URL configuration

const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL || "http://stevenduncan.runasp.net"
    : "https://localhost:7290";

export default API_BASE_URL;
