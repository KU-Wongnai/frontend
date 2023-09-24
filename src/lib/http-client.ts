import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

export const httpClient = axios.create({
  baseURL: API_URL,
});
