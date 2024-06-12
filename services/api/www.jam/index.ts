import axios from "axios";

const wwwJamApiInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_WWW_JAM_API_URL,
  headers: { "Content-Type": "application/json" },
});

export { wwwJamApiInstance };
