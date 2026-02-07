import React, { useState } from "react";
import { LoginRequest } from "../../api/types";
// import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { UsernameInput } from "./UsernameInput";
import { LoginButton } from "./LoginButton";

interface LoginComponentProps {
  onLogout: () => void;
  onLogin: (token: string) => void;
}

export const LoginComponent = ({
  onLogout,
  onLogin,
}: LoginComponentProps) => {
  const [loginData, setLoginData] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  // const handleEmailChange = (newEmail: string) => {
  //   setLoginData((prev) => ({ ...prev, email: newEmail }));
  // };

  const handleUsernameChange = (newUsername: string) => {
    setLoginData((prev) => ({ ...prev, username: newUsername }));
  };

  const handlePasswordChange = (newPassword: string) => {
    setLoginData((prev) => ({ ...prev, password: newPassword }));
  };

  return (
    <div className="flex flex-col items-center text-slate-900 dark:text-slate-100 p-6">
      <div className="text-2x1 font-bold mt-8 mb-6">{"LOGIN"}</div>
      
      <div className="flex flex-col gap-4 w-full max-w-md">
        {/* <EmailInput
          email={registrationData.email}
          onChange={handleEmailChange}
        /> */}
        <UsernameInput
          username={loginData.username}
          onChange={handleUsernameChange}
        />
        <PasswordInput
          password={loginData.password}
          onChange={handlePasswordChange}
        />
        <LoginButton
          // email={loginData.email}
          username={loginData.username}
          password={loginData.password}
          onLogin={onLogin}
        />
      </div>
    </div>
  );
};
