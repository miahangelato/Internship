

import { User } from "@/src/types/user";

export interface LoginResponse {
  success: boolean;
  data?: {
    user?: User;
    tokens?: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      token_type: string;
    };
  };
  error?: {
    code?: string;
    message?: string;
  };
}
