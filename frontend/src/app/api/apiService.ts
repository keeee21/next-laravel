import axios from "axios";

import { LoginParams, RegisterParams } from "../types/auth";
import { Tweet } from "../types/tweet";
import { FailedPost, SuccessPost } from "../types/api";

// create an axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8083",
  withCredentials: true,
});

export const getCsrfCookie = async () => {
  return await apiClient.get("/sanctum/csrf-cookie");
};

export const login = async (loginParams: LoginParams) => {
  return await apiClient.post("/login", loginParams);
};

export const register = async (registerParams: RegisterParams) => {
  return await apiClient.post("/register", registerParams);
};

export const getAllTweets = async (): Promise<Tweet[]> => {
  const response = await apiClient.get("/tweets");
  return response.data;
};

export const postTweet = async (tweet: string): Promise<SuccessPost | FailedPost> => {
  const response = await apiClient.post("/postTweet", { tweet: tweet });
  return response.data;
};
