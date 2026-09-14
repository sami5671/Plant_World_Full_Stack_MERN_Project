import axios from "axios";

const requestOnAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "https://plant-server-v2-0.vercel.app",
  withCredentials: true,
});

export default requestOnAxios;
