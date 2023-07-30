import axios from "axios";

import { LoginParams } from "../types/auth";

export const getCsrfCookie = async () => {
  return await axios.get("http://localhost:8083/sanctum/csrf-cookie", { withCredentials: true });
};

export const login = async (loginParams: LoginParams) => {
  return await axios.post("http://localhost:8083/login", loginParams, { withCredentials: true });
};