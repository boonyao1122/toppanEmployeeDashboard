import axios from "axios";

const BASE_URL = "http://localhost:3001/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
