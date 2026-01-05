import React, { useState } from "react";
import { TextField } from "@mui/material";

interface PasswordInputProps {
  password: string;
  onChange: (value: string) => void
}

export const PasswordInput = ({ password, onChange }: PasswordInputProps) => {
  return (
    <TextField
      id="outlined-basic"
      label="Password"
      variant="outlined"
      type="password"
      value={password}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
