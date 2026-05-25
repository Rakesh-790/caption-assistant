import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1500/caption-assistant",
  
  withCredentials: true,
});

export default axiosInstance;