import { UserProfile } from "../types";
import { requestJson } from "../requestJson";
import { getCookie } from "../../utils/cookies";

class UserService {
  baseUrl = process.env.REACT_APP_BASE_URL;

  async me(): Promise<UserProfile> {
    const token = getCookie("token");

    return requestJson<UserProfile>(`${this.baseUrl}/api/v1/user/me`, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }
}

export const userService = new UserService();