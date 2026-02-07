import React from "react";
import { TextInput } from "../../../components/ui/TextInput";

interface UsernameInputProps {
  username: string;
  onChange: (value: string) => void;
}

export const UsernameInput = ({ username, onChange }: UsernameInputProps) => {
  return (
    <TextInput
      label="Username"
      value={username}
      onChange={onChange}
      autoComplete="username"
    />
  );
};
