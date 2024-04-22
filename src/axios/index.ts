import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
