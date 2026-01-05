import React, { useEffect, useState } from 'react';
import { RegistrationScreen } from './screens/Registration/RegistrationScreen/RegistrationScreenComponent';


const AUTH_TOKEN_STORAGE_KEY = 'token';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    setIsAuth(Boolean(storedToken));
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    const demoToken = crypto.randomUUID();
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, demoToken);
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setIsAuth(false);
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

  // if (!isAuth) {
  //   return (

  //   );
  // }

  return <RegistrationScreen onLogout={handleLogout} />;
}