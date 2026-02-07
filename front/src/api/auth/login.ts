import { LoginRequest, AuthResponse } from "../types";
import { requestJson } from "../requestJson";

class LoginService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  async loginUser(userData: LoginRequest): Promise<AuthResponse> {
    return requestJson<AuthResponse>(`${this.baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  }
}

export const login = new LoginService();