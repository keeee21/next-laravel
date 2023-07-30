import { useState } from "react";

import { LoginParams } from "../types/auth";
import { getCsrfCookie, login } from "../api/apiService";

export function useLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (loginParams: LoginParams) => {
    try {
      await getCsrfCookie();
      console.log("sunctom");

      const response = await login(loginParams);

      console.log("ログインできた");
      console.log(response.data);
    } catch (error) {
      console.error("ログインに失敗しました：", error);
    }
  };

  return {
    showPassword,
    handleShowClick,
    handleLogin,
  };
}
