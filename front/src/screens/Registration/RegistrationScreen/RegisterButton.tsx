import React, { useState } from 'react';
import { Button } from '@mui/material';
import { registration, User } from '../../../api/registration';

interface RegisterButtonProps {

    email: string;
    username: string;
    password: string;
    onRegister: (token: string) => void;
  }
  
  export const RegisterButton = ({ 
    email,
    username,
    password,
    onRegister,

  }: RegisterButtonProps) => {

    const handleRegister = () => {
        // console.log("email: " + email, "username: " + username, "password: " + password);
        registration.registrationUser(
            {
                email: email,
                username: username,
                password: password,
            } as User
        ).then((response) => {
        if (response.token) {
            onRegister(response.token);
        }
        }).catch((error) => {
            console.log(error);
        });
    }
  
  
    return (
    <Button variant="outlined" type="button" onClick={handleRegister}>Register</Button>
    );
  };