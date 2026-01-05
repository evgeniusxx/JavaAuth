import React, { useState } from "react";
import { RegistrationData } from "../types";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { UsernameInput } from "./UsernameInput";
import { RegisterButton } from "./RegisterButton";

interface RegistrationScreenProps {
  onLogout: () => void;
  onRegister: (token: string) => void;
}

export const RegistrationScreen = ({ onLogout, onRegister }: RegistrationScreenProps) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: "",
    username: "",
    password: "",
  });

  const handleEmailChange = (newEmail: string) => {
    setRegistrationData((prev) => ({ ...prev, email: newEmail }));
  };

  const handleUsernameChange = (newUsername: string) => {
    setRegistrationData((prev) => ({ ...prev, username: newUsername }));
  };

  const handlePasswordChange = (newPassword: string) => {
    setRegistrationData((prev) => ({ ...prev, password: newPassword }));
  };


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 bg-white">
      <EmailInput email={registrationData.email} onChange={handleEmailChange} />
      <UsernameInput
        username={registrationData.username}
        onChange={handleUsernameChange}
      />
      <PasswordInput
        password={registrationData.password}
        onChange={handlePasswordChange}
      />
      <RegisterButton
        email={registrationData.email}
        username={registrationData.username}
        password={registrationData.password}
        onRegister={onRegister}
      />
    </div>
  );
};
