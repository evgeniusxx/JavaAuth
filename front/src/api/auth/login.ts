import { LoginRequest, AuthResponse } from "../types";

class LoginService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  async loginUser(userData: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("OSHIBKA EPTA");
    }
    return await response.json();
  }
}

export const login = new LoginService();
