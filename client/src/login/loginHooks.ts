import { useState } from "react";
import { loginApi } from "@/src/api/login/routes";
import { LoginResponse } from "@/src/types/login";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi(email, password);
      setLoading(false);
      if (response.data.success) {
        return response.data;
      } else {
        setError("Invalid credentials");
        return null;
      }
    } catch (err: any) {
      setLoading(false);
      setError("Invalid credentials");
      return null;
    }
  };

  return { login, loading, error };
}
