import { API_URL } from "./constant";
import axios from "axios";

export const httpClient = 
  axios.create({
    baseURL: API_URL + "/api/v1",
    timeout: 300000,
  })



export const errorMessage = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data.message);
  } else if (error.request) {
    throw new Error(error.request);
  } else {
    throw new Error(error.message);
  }
};
