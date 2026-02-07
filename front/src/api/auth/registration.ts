import { RegisterRequest, AuthResponse } from "../types";
import { requestJson } from "../requestJson";

class RegistrationService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  async registrationUser(userData: RegisterRequest): Promise<AuthResponse> {
    return requestJson<AuthResponse>(`${this.baseUrl}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  }
}

export const registration = new RegistrationService();
