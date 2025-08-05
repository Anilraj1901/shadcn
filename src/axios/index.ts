/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default apiInstance;
