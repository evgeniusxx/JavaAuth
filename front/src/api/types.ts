// Данные для входа
export interface LoginRequest {
  username: string;
  password: string;
}

// Данные для регистрации
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

// Ответ от сервера при аутентификации (login/register)
export interface AuthResponse {
  token: string;
  user?: UserProfile;
}

// Профиль пользователя
export interface UserProfile {
  email: string;
  username: string;
  // Добавьте другие поля профиля по необходимости
}

