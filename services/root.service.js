import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = process.env.API_URL;
const API_URL = "http://192.168.1.2:3001/api/"

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("jwt-auth");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }

  if (config.data instanceof FormData) {
    config.headers["Content-type"] = "multipart/form-data";
  }

  return config;
});

export default instance;