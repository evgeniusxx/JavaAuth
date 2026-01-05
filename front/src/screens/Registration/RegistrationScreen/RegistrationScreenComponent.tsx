import React, { useState } from "react";
import { RegistrationData } from "../types";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { UsernameInput } from "./UsernameInput";
import { AcceptButton } from "./AcceptButton";

interface RegistrationScreenProps {
  onLogout: () => void;
}

export const RegistrationScreen = ({ onLogout }: RegistrationScreenProps) => {
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
      <AcceptButton
        email={registrationData.email}
        username={registrationData.username}
        password={registrationData.password}
      />
    </div>
  );
};
