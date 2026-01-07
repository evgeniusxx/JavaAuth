import { RegisterRequest, AuthResponse } from "../types";

class RegistrationService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  async registrationUser(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  }
}

export const registration = new RegistrationService();
