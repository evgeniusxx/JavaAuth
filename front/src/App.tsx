import React, { useEffect, useState } from "react";
import { RegistrationScreen } from "./screens/Registration/RegistrationScreen/RegistrationScreenComponent";
import { deleteCookie, getCookie, setCookie } from "./utils/cookies";
import { LoginComponent } from "./screens/Login/LoginComponent";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";


const AUTH_TOKEN_STORAGE_KEY = "token";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistration, setIsRegistration] = useState(false);

  useEffect(() => {
    const storedToken = getCookie(AUTH_TOKEN_STORAGE_KEY);
    setIsAuth(Boolean(storedToken));
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    const demoToken = crypto.randomUUID();
    setCookie(AUTH_TOKEN_STORAGE_KEY, demoToken);
    setIsAuth(true);
  };

  const handleLogout = () => {
    deleteCookie(AUTH_TOKEN_STORAGE_KEY);
    setIsAuth(false);
  };

  const handleRegister = (token: string) => {
    setCookie(AUTH_TOKEN_STORAGE_KEY, token);
    setIsAuth(true);
  };
  if (isLoading) {
    return (
      <div>
        <div className="w-full max-w-md rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-6">
          <p className="text-sm text-slate-300">Загрузка…</p>
        </div>
      </div>
    );
  }

  return (
    <SnackbarProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex justify-end p-4">
          <ThemeSwitcher />
        </div>
        <div className="h-[500px] flex flex-col justify-between">
          
          {isRegistration ? (
            <RegistrationScreen onLogout={handleLogout} onRegister={handleRegister} />
          ) : <LoginComponent onLogout={handleLogout} onLogin={handleLogin} />}
          <div className="mt-8 mb-6 flex justify-center items-bottom">
            <button
              onClick={() => setIsRegistration(!isRegistration)}
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-600"
            >
              {isRegistration ? "Войти" : "Нет аккаунта? Зарегистрироваться"}
            </button>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
