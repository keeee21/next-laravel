import { getCsrfCookie, register } from "../api/apiService";
import { RegisterParams } from "../types/auth";

export function useRegister() {
  const handleRegister = async (registerParams: RegisterParams) => {
    try {
      await getCsrfCookie();
      console.log("sunctom");

      const response = await register(registerParams);

      console.log("新規登録");
      console.log(response.data);
    } catch (error) {
      console.log("新規登録に失敗しました:", error);
    }
  };

  return {
    handleRegister,
  };
}
