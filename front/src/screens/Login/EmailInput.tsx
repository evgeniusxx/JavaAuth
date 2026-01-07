import React, { useState } from "react";
import { TextField } from "@mui/material";

interface EmailInputProps {
  email: string;
  onChange: (value: string) => void;
}

export const EmailInput = ({ email, onChange }: EmailInputProps) => {
  return (
    <TextField
      id="outlined-basic"
      label="Email"
      variant="outlined"
      value={email}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
