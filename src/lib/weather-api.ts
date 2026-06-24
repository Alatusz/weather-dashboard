import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: API_KEY,
  },
});
