
import { API_URL } from "./constant";
import axios from "axios";

export const httpClient = 
  axios.create({
    baseURL: API_URL + "/api/v1",
    timeout: 300000,
  })
  httpClient.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
      config.headers["Content-Type"] = "application/json",
      config.headers.Accept = "application/json"
         return config;
     },
     (error) => {
         return Promise.reject(error)
     }
 )



export const errorMessage = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data.message);
  } else if (error.request) {
    throw new Error(error.request);
  } else {
    throw new Error(error.message);
  }
};
