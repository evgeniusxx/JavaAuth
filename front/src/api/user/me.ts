import { UserProfile } from "../types";

class UserService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  async me(token: string): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/api/v1/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("OSHIBKA EPTA");
    }
    return await response.json();
  }
}

export const userService = new UserService();
    