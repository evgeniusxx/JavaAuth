import React from "react";
import { TextInput } from "../../../components/ui/TextInput";

interface EmailInputProps {
  email: string;
  onChange: (value: string) => void;
}

export const EmailInput = ({ email, onChange }: EmailInputProps) => {
  return (
    <TextInput
      label="Email"
      type="email"
      value={email}
      onChange={onChange}
      autoComplete="email"
    />
  );
};
