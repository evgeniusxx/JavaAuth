import React from "react";
import { TextInput } from "../../../components/ui/TextInput";

interface PasswordInputProps {
  password: string;
  onChange: (value: string) => void;
}

export const PasswordInput = ({ password, onChange }: PasswordInputProps) => {
  return (
    <TextInput
      label="Password"
      type="password"
      value={password}
      onChange={onChange}
      autoComplete="current-password"
    />
  );
};
