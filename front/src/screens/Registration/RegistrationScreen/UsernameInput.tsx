import React, { useState } from "react";
import { TextField } from "@mui/material";

interface UsernameInputProps {
  username: string;
  onChange: (value: string) => void;
}

export const UsernameInput = ({ username, onChange }: UsernameInputProps) => {
  return (
    <TextField
      id="outlined-basic"
      label="Username"
      variant="outlined"
      value={username}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
