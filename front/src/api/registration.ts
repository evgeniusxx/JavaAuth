// функция регистрации
const BASE_URL_BD = "http://95.142.38.51:8080";

export interface User {
  email: string;
  username: string;
  password: string;
  token: string;
}

class RegistrationService {
  baseUrl = BASE_URL_BD;

  async registrationUser(userData: User): Promise<User> {
    const response = await fetch(`${this.baseUrl}/api/users/register`, {
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
export const registration = new RegistrationService();
