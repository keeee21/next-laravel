import axios from "axios";

import { LoginParams, RegisterParams } from "../types/auth";
import { Tweet } from "../types/tweet";

export const getCsrfCookie = async () => {
  return await axios.get("http://localhost:8083/sanctum/csrf-cookie", { withCredentials: true });
};

export const login = async (loginParams: LoginParams) => {
  return await axios.post("http://localhost:8083/login", loginParams, { withCredentials: true });
};

export const register = async (registerParams: RegisterParams) => {
  return await axios.post("http://localhost:8083/register", registerParams, { withCredentials: true });
};

export const getAllTweets = async (): Promise<Tweet[]> => {
  const response = await axios.get("http://localhost:8083/tweets", { withCredentials: true });
  return response.data;
};
